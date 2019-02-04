import React from 'react';
import {connect} from 'react-redux';
import axios from '../../axios-primary';

import Modal from "../UI/Modal/Modal";
import DynamicForm from "../DynamicForm/DynamicForm";

class ManageCategory extends React.Component {
    state = {
        formControls: {
            title: {
                label: 'Title',
                type: 'text',
                validators: {required: true},
                errorMessages: {required: 'required'}
            },
            type: {
                label: 'Type',
                type: 'select',
                validators: {required: true},
                errorMessages: {required: 'required'},
                options: [
                    {label: 'Category', value: 'category'},
                    {label: 'Property', value: 'property'}
                ]
            }/* the example for showDepended select,
            dataType: {
                label: 'Data Type',
                type: 'select',
                validators: {required: true},
                errorMessages: {required: 'required'},
                options: [
                    {label: '', value: ''},
                    {label: 'Numeric Range', value: 'numericRange'},
                    {label: 'Collection', value: 'collection'},
                    {label: 'Date Range', value: 'dateRange'}
                ],
                showDepended: {target: 'type', value: 'property'} // show only if 'type' control's value is 'property'
            }*/
        }
    };

    // NOTE: state depended on props change example
    /*static getDerivedStateFromProps(nextProps, prevState) {
        console.log(nextProps);
        const updateControls = updateObject(prevState.formControls, {
            title: updateObject(prevState.formControls['title'], {
                value: nextProps.nodeTitle
            })
        });
        return {...prevState, formControls: updateControls};
        /!*if (nextProps.categories.length !== prevState.formControls.parentId.options.length) {
            // update parentId dropdown options
            const updatedControls = updateObject(prevState.formControls, {
                parentId: updateObject(prevState.formControls['parentId'], {
                    options: nextProps.categories
                })
            });
            return {...prevState, formControls: updatedControls};
        }
        return prevState;*!/
    }*/

    onSubmit = formData => {
        // additionally set parentId
        formData.parentId = this.props.parentId;

        // if node already exists, update it
        if (this.props.nodeId) {
            formData.id = this.props.nodeId;
            axios.put('/category', formData)
                .then(res => {
                    this.props.onNodeUpdated({_id: res.data._id, title: res.data.title, type: res.data.type});
                });

            // NOTE: chaining dispatch methods example. Not sure if it works properly
            /*this.props.onUpdateCategory(categoryData)
                .then(res => {
                    this.props.onNodeUpdated(categoryData)
                })*/
        } else { // create new node
            console.log(formData, 'formData');
            axios.post('/category', formData)
                .then(res => {
                    this.props.onNodeCreated({_id: res.data._id, title: res.data.title, type: res.data.type});
                });
        }
    };

    render() {
        return (
            <div>
                <Modal show={this.props.addingCategory}
                       title={'Add Category'}
                       onModalClose={this.props.toggleModal}>
                    <div className="masonry-item">
                        <div className="bgc-white p-20 bd">
                            <DynamicForm formControls={this.state.formControls}
                                         onSubmit={model => this.onSubmit(model)}/>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.global.error
        // NOTE: reselect example
        // categories: getCategoriesForSelect(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // NOTE: if you want to chain dispatch actions, use promises
        /*onAddCategory: payload => {
            return new Promise((resolve, reject) => {
                dispatch(actions.addCategory(payload));
                resolve();
            });
        },
        onUpdateCategory: payload => {
            return new Promise((resolve, reject) => {
                dispatch(actions.updateCategory(payload));
                resolve();
            });
        }*/
    };
};

// NOTE: reselect example
/*const getCategories = state => state.category.categories;
const getCategoriesForSelect = createSelector(getCategories, (categories) => {
    console.log(categories.length, 'llllll');
    if (categories && categories.length) {
        const categoriesSelect = categories.map(item => {
            return {
                value: item._id,
                label: item.title
            }
        });
        categoriesSelect.unshift({value: '', label: ''});

        return categoriesSelect;
    }
    return [];
});*/

export default connect(mapStateToProps, mapDispatchToProps)(ManageCategory);
