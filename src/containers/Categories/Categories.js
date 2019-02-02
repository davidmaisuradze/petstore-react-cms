import React, {Component} from 'react';
import {connect} from 'react-redux';
import SortableTree, {addNodeUnderParent, changeNodeAtPath, insertNode, removeNodeAtPath} from 'react-sortable-tree';
import axios from '../../axios-primary';

//import * as actions from '../../store/actions';
import ManageCategory from "../../components/AddOrUpdateCategory/ManageCategory";
import Button from "../../components/UI/Button/Button";
import ConfirmationDialog from "../../components/UI/ConfirmationDialog/ConfirmationDialog";

class Categories extends Component {
    state = {
        categories: [],
        addingCategory: false,
        confirmDialogOpened: false,
        nodeParentId: null,
        nodePath: null,
        nodeId: null,
        nodeTitle: '',
        nodeType: ''
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
                this.setState({categories: response.data})
            })
            .catch(err => {
                console.log(err)
            });
    }

    // getNodeKey function for SortableTree
    getNodeKey = ({treeIndex}) => treeIndex;

    // handle tree changes, such as expand, collapse
    handleTreeChange = treeData => {
        console.log(treeData, 'treeData');
        this.setState({categories: treeData});
    };

    // when node will be moved
    onMoveNode = data => {
        // detect if node is becoming root(with no parent) node
        const nextParentNode = data.nextParentNode ? data.nextParentNode : null;
        const nodeData = {
            id: data.node._id,
            parentId: nextParentNode ? nextParentNode._id : null
        };

        // if node is not becoming root node, to get its siblings we have to check its parent's children,
        // otherwise we have to check root nodes(treeData)
        const siblings = nextParentNode ? nextParentNode.children : data.treeData;
        // get currently moved node's index in parent to detect its ordering
        const nodeIndexInParent = siblings.findIndex(x => x._id === nodeData.id);
        // detect prevSiblingId for better ordering performance on server
        nodeData['prevSiblingId'] = nodeIndexInParent > 0 ? siblings[nodeIndexInParent - 1]._id : null;

        axios.put('/category/updateCategoryParent', nodeData)
            .then(res => {
                console.log(res);
            });
    };

    onAddNode = (node, path) => {
        // save state for ManageCategories component
        if (path) { // if node has parent
            this.setState({
                nodeParentId: node._id,
                nodePath: path,
                nodeId: null
            }, this.toggleManageCategories);
        } else { // if it's a root node
            this.setState({nodeId: null}, this.toggleManageCategories);
        }
    };

    onNodeCreated = (data) => {
        console.log(this.state.nodePath);
        const newNode = {
            _id: data._id,
            title: data.title,
            type: data.type
        };
        console.log(newNode, 'newNode');

        if (this.state.nodePath) { // if node is not root node, add it under its parent
            this.setState(state => ({
                categories: addNodeUnderParent({
                    treeData: state.categories,
                    parentKey: this.state.nodePath[this.state.nodePath.length - 1],
                    expandParent: true,
                    getNodeKey: this.getNodeKey,
                    newNode: newNode
                }).treeData
            }), this.toggleManageCategories);
        } else { // if node has no parent, insert as root node
            this.setState(state => ({
                categories: insertNode({
                    treeData: state.categories,
                    depth: 0,
                    newNode: newNode,
                    getNodeKey: this.getNodeKey
                }).treeData
            }), this.toggleManageCategories);
        }
        this.setState({
            nodePath: null,
            nodeParentId: null,
            nodeId: null
        });
    };

    onEditNode = (node, path) => {
        // save state for ManageCategories component
        this.setState({
            nodeParentId: node.parentId,
            nodeId: node._id,
            nodePath: path,
            nodeTitle: node.title
        }, this.toggleManageCategories);
    };

    onNodeUpdated = data => {
        // change node using SortableTree component's function
        this.setState(state => ({
            categories: changeNodeAtPath({
                treeData: state.categories,
                path: state.nodePath,
                newNode: {
                    _id: data._id,
                    title: data.title,
                    type: data.type
                },
                getNodeKey: this.getNodeKey
            }),
            nodePath: null,
            nodeParentId: null,
            nodeId: null,
            nodeTitle: null
        }), this.toggleManageCategories);
    };

    onRemoveNode = (node, path) => {
        // save state for confirmation dialog
        this.setState({nodePath: path, nodeId: node._id}, this.toggleConfirmationModal);
    };

    nodeRemoved = () => {
        //this.props.onRemoveCategory(this.state.nodeId);
        axios.delete('/category/' + this.state.nodeId)
            .then(res => {
                this.setState(state => ({
                    categories: removeNodeAtPath({
                        treeData: state.categories,
                        path: this.state.nodePath,
                        getNodeKey: this.getNodeKey
                    }),
                    nodeId: null,
                    nodePath: null
                }), this.toggleConfirmationModal);
            });
    };


    render() {
        return (
            <div>
                /* button to add new root node */
                <Button aclass={'btn-success'} clicked={() => this.onAddNode(null)}>Add Category</Button>

                /* Manage Category component, by this I will add or update new node */
                <ManageCategory parentId={this.state.nodeParentId}
                                     nodeId={this.state.nodeId}
                                     nodeTitle={this.state.nodeTitle}
                                     addingCategory={this.state.addingCategory}
                                     onNodeCreated={e => this.onNodeCreated(e)}
                                     onNodeUpdated={data => this.onNodeUpdated(data)}
                                     toggleModal={this.toggleManageCategories}/>

                /* ConfirmationDialog window, to secure user from instant deletion */
                <ConfirmationDialog show={this.state.confirmDialogOpened}
                                    closeModal={this.toggleConfirmationModal}
                                    acceptModal={this.nodeRemoved}
                >
                    Delete this category?
                </ConfirmationDialog>

                /* SortableTree */
                <div className='sortable-tree'>
                    <SortableTree
                        treeData={this.state.categories}
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

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
