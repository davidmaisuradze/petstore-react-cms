import React, {Component} from 'react';
import {connect} from 'react-redux';
import SortableTree from 'react-sortable-tree';
import axios from '../../axios-primary';
import * as actions from '../../store/actions';

import ManageCategory from "./ManageCategory/ManageCategory";
import Button from "../../components/UI/Button/Button";
import ConfirmationDialog from "../../components/UI/ConfirmationDialog/ConfirmationDialog";
import {
    addNode,
    editNode,
    moveNode,
    nodeCreated,
    nodeRemoved,
    nodeUpdated,
    removeNode
} from "../../services/sortable-tree.service";

class Categories extends Component {
    state = {
        categories: [],
        addingCategory: false,
        confirmDialogOpened: false,
        nodeParentId: null,
        nodePath: null,
        nodeId: null,
        nodeTitle: ''
    };

    // to toggle manage categories modal
    toggleManageCategories = () => {
        this.setState(prevState => (
            {addingCategory: !prevState.addingCategory}
        ));
    };

    // to toggle confirmation dialog
    toggleConfirmationModal = () => {
        this.setState(prevState => (
            {confirmDialogOpened: !prevState.confirmDialogOpened}
        ));
    };

    componentDidMount() {
        //this.props.onGetCategories();
        axios.get('/category/getTree')
            .then(response => {
                this.setState({categories: response.data});
            })
            .catch(err => {
                console.log(err)
            });

        this.props.onGetProperties();
    }

    // handle tree changes, such as expand, collapse
    handleTreeChange = treeData => {
        this.setState({categories: treeData});
    };

    // when node will be moved
    onMoveNode = data => {
        let nodeData = moveNode(data);

        axios.put('/category/updateCategoryParent', nodeData)
            .then(res => {
                console.log(res);
            });
    };

    onAddNode = (node, path) => {
        const stateData = addNode(node, path);
        this.props.onSetFormDefaultValues({title: ''});
        this.setState(stateData, this.toggleManageCategories);
    };

    onNodeCreated = (data) => {
        const newNode = {
            _id: data._id,
            title: data.title
        };
        this.setState(state => (nodeCreated('categories', state.categories, newNode, this.state.nodePath)), this.toggleManageCategories);
    };

    onEditNode = (node, path) => {
        // save state for ManageCategories component
        const stateData = editNode(node, path);
        this.props.onSetFormDefaultValues({title: node.title});
        this.setState(stateData, this.toggleManageCategories);
    };

    onNodeUpdated = data => {
        // change node using SortableTree component's function
        const newNode = {
            _id: data._id,
            title: data.title,
            type: data.type
        };

        this.setState(state => (nodeUpdated('categories', state.categories, state.nodePath, newNode)), this.toggleManageCategories);
    };

    onRemoveNode = (node, path) => {
        // save state for confirmation dialog
        this.setState(removeNode(node, path), this.toggleConfirmationModal);
    };

    nodeRemoved = () => {
        //this.props.onRemoveCategory(this.state.nodeId);
        axios.delete('/category/' + this.state.nodeId)
            .then(res => {
                this.setState(state => (nodeRemoved('categories', state.categories, state.nodePath)), this.toggleConfirmationModal);
            });
    };


    render() {
        return (
            <div>
                {/* button to add new root node */}
                <Button aclass={'btn-success'} clicked={() => this.onAddNode(null)}>Add Category</Button>

                {/* Manage Category component, by this I will add or update new node */}
                {this.state.addingCategory ?
                    (<ManageCategory parentId={this.state.nodeParentId}
                                     nodeId={this.state.nodeId}
                                     nodeTitle={this.state.nodeTitle}
                                     onNodeCreated={e => this.onNodeCreated(e)}
                                     onNodeUpdated={data => this.onNodeUpdated(data)}
                                     toggleModal={this.toggleManageCategories}/>) : null
                }

                {/* ConfirmationDialog window, to secure user from instant deletion */}
                <ConfirmationDialog show={this.state.confirmDialogOpened}
                                    closeModal={this.toggleConfirmationModal}
                                    acceptModal={this.nodeRemoved}
                >
                    Delete this category?
                </ConfirmationDialog>

                {/* SortableTree */}
                <div className='sortable-tree'>
                    <SortableTree
                        treeData={this.state.categories}
                        onChange={treeData => this.handleTreeChange(treeData)}
                        onMoveNode={data => this.onMoveNode(data)}
                        generateNodeProps={({node, path}) => {
                            return {
                                /* buttons to add, edit or remove node */
                                buttons: [
                                    <button onClick={() => this.onAddNode(node, path)}>Add Child</button>,
                                    <button onClick={() => this.onEditNode(node, path)}>Edit</button>,
                                    <button onClick={() => this.onRemoveNode(node, path)}>Remove</button>
                                ],
                                /* className depends on node.type, 'category' types(primary nodes) are color in white-grey,
                                 'property' types (secondary nodes) are colored in blue */
                                className: 'rst__moveHandle--color-primary icon-primary'
                            }
                        }}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        onGetProperties: () => dispatch(actions.getProperties()),
        onSetFormDefaultValues: payload => dispatch(actions.setFormDefaultValues(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
