import {addNodeUnderParent, changeNodeAtPath, insertNode, removeNodeAtPath} from "react-sortable-tree";

// getNodeKey function for SortableTree
export const getNodeKey = ({treeIndex}) => treeIndex;

// when node will be moved
export const moveNode = data => {
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

    return nodeData;
};

export const addNode = (node, path) => {
    // save node info
    let data = {};

    if (path) { // if node has parent
        data = {
            nodeParentId: node._id,
            nodePath: path,
            nodeId: null
        };
    } else { // if it's a root node
        data = {nodeId: null};
    }

    return data;
};

export const editNode = (node, path) => {
    // save state for ManageCategories component
    return {
        nodeParentId: node.parentId,
        nodeId: node._id,
        nodePath: path,
        nodeTitle: node.title
    };
};

export const removeNode = (node, path) => {
    return {nodePath: path, nodeId: node._id};
};

export const nodeCreated = (stateNodesName, stateNodes, newNode, nodePath) => {
    let data = {};
    if (nodePath) { // if node is not root node, add it under its parent
        data = {
            [stateNodesName]: addNodeUnderParent({
                treeData: stateNodes,
                parentKey: nodePath[nodePath.length - 1],
                expandParent: true,
                getNodeKey: getNodeKey,
                newNode: newNode
            }).treeData
        };
    } else { // if node has no parent, insert as root node
        data = {
            [stateNodesName]: insertNode({
                treeData: stateNodes,
                depth: 0,
                newNode: newNode,
                getNodeKey: getNodeKey
            }).treeData
        };
    }
    data['nodePath'] = null;
    data['nodeParentId'] = null;
    data['nodeId'] = null;

    return data;
};

export const nodeUpdated = (stateNodesName,stateNodes, nodePath, newNode) => {
    return {
        [stateNodesName]: changeNodeAtPath({
            treeData: stateNodes,
            path: nodePath,
            newNode: newNode,
            getNodeKey: getNodeKey
        }),
        nodePath: null,
        nodeParentId: null,
        nodeId: null,
        nodeTitle: null
    };
};

export const nodeRemoved = (stateNodesName,stateNodes, nodePath) => {
    return {
        [stateNodesName]: removeNodeAtPath({
            treeData: stateNodes,
            path: nodePath,
            getNodeKey: getNodeKey
        }),
        nodeId: null,
        nodePath: null
    };
};
