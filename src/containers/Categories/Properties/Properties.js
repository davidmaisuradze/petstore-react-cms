import React, {Component} from 'react';
import {connect} from 'react-redux';
import SortableTree, {addNodeUnderParent, changeNodeAtPath, insertNode, removeNodeAtPath} from 'react-sortable-tree';
import {
    addNode,
    moveNode,
    nodeCreated,
    nodeUpdated,
    editNode, removeNode, nodeRemoved
} from "../../../services/sortable-tree.service";
import axios from '../../../axios-primary';

import Button from "../../../components/UI/Button/Button";
import ConfirmationDialog from "../../../components/UI/ConfirmationDialog/ConfirmationDialog";

class Properties extends Component {
    state = {
        properties: [],
        confirmDialogOpened: false,
        nodeParentId: null,
        nodePath: null,
        nodeId: null,
        nodeTitle: ''
    };

    // to toggle confirmation dialog
    toggleConfirmationModal = () => {
        this.setState(prevState => (
            {confirmDialogOpened: !prevState.confirmDialogOpened}
        ));
    };

    componentDidMount() {
        //this.props.onGetCategories();
        axios.get('/property/getTree/' + this.props.categoryId)
            .then(response => {
                this.setState({properties: response.data})
            })
            .catch(err => {
                console.log(err)
            });
    }

    // handle tree changes, such as expand, collapse
    handleTreeChange = treeData => {
        this.setState({properties: treeData});
    };

    // when node will be moved
    onMoveNode = data => {
        let nodeData = moveNode(data);
        nodeData['categoryId'] = this.props.categoryId;

        axios.put('/property/updatePropertyParent', nodeData)
            .then(res => {
                console.log(res);
            }).catch(err => console.log(err));
    };

    onAddNode = (node, path) => {
        const stateData = addNode(node, path);
        this.setState(stateData);
    };

    onNodeCreated = (data) => {
        const newNode = {
            _id: data._id,
            title: data.title,
            type: data.type
        };
        this.setState(state => (nodeCreated('properties', state.properties, newNode, this.state.nodePath)));
    };

    onEditNode = (node, path) => {
        const stateData = editNode(node, path);
        this.setState(stateData);
    };

    onNodeUpdated = data => {
        // change node using SortableTree component's function
        const newNode = {
            _id: data._id,
            title: data.title,
            type: data.type
        };

        this.setState(state => (nodeUpdated('properties', state.properties, state.nodePath, newNode)));
    };

    onRemoveNode = (node, path) => {
        // save state for confirmation dialog
        this.setState(removeNode(node, path), this.toggleConfirmationModal);
    };

    nodeRemoved = () => {
        //this.props.onRemoveCategory(this.state.nodeId);
        axios.delete('/property/' + this.state.nodeId)
            .then(res => {
                this.setState(state => (nodeRemoved('properties', state.properties, state.nodePath)), this.toggleConfirmationModal);
            });
    };


    render() {
        return (
            <div>
                {/* button to add new root node */}
                <Button aclass={'btn-success'} clicked={() => this.onAddNode(null)}>Add Property</Button>

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
                        treeData={this.state.properties}
                        onChange={treeData => this.handleTreeChange(treeData)}
                        onMoveNode={data => this.onMoveNode(data)}
                        generateNodeProps={({node, path}) => {
                            const primaryClasses = 'rst__moveHandle--color-primary icon-primary';
                            const secondaryClasses = 'rst__moveHandle--color-secondary icon-secondary';
                            return {
                                /* buttons to add, edit or remove node */
                                buttons: [
                                    <button onClick={() => this.onAddNode(node, path)}>Add Child</button>,
                                    <button onClick={() => this.onEditNode(node, path)}>Edit</button>,
                                    <button onClick={() => this.onRemoveNode(node, path)}>Remove</button>
                                ],
                                /* className depends on node.type, 'category' types(primary nodes) are color in white-grey,
                                 'property' types (secondary nodes) are colored in blue */
                                className: node.type === 'category' ? primaryClasses : secondaryClasses
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Properties);
