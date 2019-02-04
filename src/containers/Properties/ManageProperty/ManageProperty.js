import React from 'react';
import Modal from "../../../components/UI/Modal/Modal";
import DynamicForm from "../../../components/DynamicForm/DynamicForm";
import Attributes from "./Attributes/Attributes";
import axios from '../../../axios-primary';

class ManageProperty extends React.Component {
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
                    {label: 'Text', value: 'text'},
                    {label: 'Select', value: 'select'}
                ]
            }
        },
        attributes: []
    };

    componentDidMount() {
        if (this.props.propertyId) {
            axios.get('/property/getPropertyAttributesByPropertyId/' + this.props.propertyId)
                .then(response => {
                    this.setState({attributes: response.data});
                });
        }
    }

    onSubmit = formData => {
        this.props.onFormSubmit(formData);
    };

    onAddAttribute = attribute => {
        if (attribute) {
            const checkAttributeIndex = this.state.attributes.findIndex(x => x._id === attribute._id);
            if (checkAttributeIndex < 0) {
                this.setState(state => ({
                    attributes: [attribute, ...state.attributes]
                }));
            }
        }
    };

    onRemoveAttribute = id => {
        this.setState(state => ({
            attributes: state.attributes.filter(x => x._id !== id)
        }));
    };

    render() {
        return (
            <div>
                <Modal show={this.props.show}
                       title={'Add Attribute'}
                       onModalClose={this.props.toggleModal}>
                    <div className="masonry-item">
                        <div className="bgc-white p-20 bd">
                            <DynamicForm formControls={this.state.formControls}
                                         defaultValues={this.props.defaultValues}
                                         onSubmit={model => this.onSubmit(model)}>
                                <Attributes attributes={this.state.attributes}
                                            onAdd={attribute => this.onAddAttribute(attribute)}
                                            onRemove={id => this.onRemoveAttribute(id)}
                                />
                            </DynamicForm>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default ManageProperty;