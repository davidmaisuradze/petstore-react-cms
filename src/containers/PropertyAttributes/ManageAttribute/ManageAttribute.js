import React from 'react';
import Modal from "../../../components/UI/Modal/Modal";
import DynamicForm from "../../../components/DynamicForm/DynamicForm";

class ManageAttribute extends React.Component {
    state = {
        formControls: {
            value: {
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
                    {label: 'Color', value: 'color'},
                    {label: 'Breed', value: 'breed'}
                ]
            }
        }
    };

    onSubmit = formData => {
        this.props.onFormSubmit(formData);
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
                                         onSubmit={model => this.onSubmit(model)}/>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default ManageAttribute;