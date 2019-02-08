import React from 'react';
import DynamicForm from "../../../components/DynamicForm/DynamicForm";
import Modal from "../../../components/UI/Modal/Modal";

class ManageAttribute extends React.Component {
    state = {
        formControls: {
            value: {
                label: 'Value',
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
                    {label: '', value: ''},
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
                       onModalClose={this.props.toggleModal}
                       needFooter={false}>
                    <div className="masonry-item">
                        <div className="bgc-white p-20 bd">
                            <DynamicForm formControls={this.state.formControls}
                                         onSubmit={model => this.onSubmit(model)}
                                         onModalClose={this.props.toggleModal}/>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default ManageAttribute;