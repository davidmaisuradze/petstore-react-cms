import React from 'react';
import axios from '../../../axios-primary';

import Properties from "./Properties/Properties";
import Modal from "../../../components/UI/Modal/Modal";
import DynamicForm from "../../../components/DynamicForm/DynamicForm";

class ManageCategory extends React.Component {
    state = {
        formControls: {
            title: {
                label: 'Title',
                type: 'text',
                validators: {required: true},
                errorMessages: {required: 'required'}
            }
            /* the example for showDepended select,
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
        },
        categoryProperties: []
    };

    componentDidMount() {
        if (this.props.nodeId) {
            axios.get('/property/getByCategoryId/' + this.props.nodeId)
                .then(res => {
                    this.setState({categoryProperties: res.data});
                }).catch(err => console.log(err));
        }
    }

    onSubmit = formData => {
        // additionally set parentId
        formData.parentId = this.props.parentId;
        formData.filterProperties = this.state.categoryProperties;

        // if node already exists, update it
        if (this.props.nodeId) {
            formData.id = this.props.nodeId;
            axios.put('/category', formData)
                .then(res => {
                    this.props.onNodeUpdated({_id: res.data._id, title: res.data.title, type: res.data.type});
                });
        } else { // create new node
            axios.post('/category', formData)
                .then(res => {
                    this.props.onNodeCreated({_id: res.data._id, title: res.data.title, type: res.data.type});
                });
        }
    };

    onAddProperty = property => {
        if (property) {
            const checkPropertyIndex = this.state.categoryProperties.findIndex(x => x._id === property._id);
            if (checkPropertyIndex < 0) {
                this.setState(prevState => ({
                    categoryProperties: [...prevState.categoryProperties, property]
                }));
            }
        }
    };

    onRemoveProperty = id => {
        this.setState(prevState => ({categoryProperties: prevState.categoryProperties.filter(x => x._id !== id)}));
    };

    render() {
        return (
            <div>
                <Modal show={true}
                       title={'Add Category'}
                       onModalClose={this.props.toggleModal}
                       needFooter={false}>
                    <div className="masonry-item">
                        <div className="bgc-white p-20 bd">
                            <DynamicForm formControls={this.state.formControls}
                                         onSubmit={model => this.onSubmit(model)}
                                         onModalClose={this.props.toggleModal}
                            >
                                <Properties categoryProperties={this.state.categoryProperties}
                                            onAdd={property => this.onAddProperty(property)}
                                            onRemove={id => this.onRemoveProperty(id)}/>
                            </DynamicForm>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default ManageCategory;
