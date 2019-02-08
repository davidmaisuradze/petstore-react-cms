import React from 'react';
import {connect} from 'react-redux';
import DynamicForm from "../../../components/DynamicForm/DynamicForm";
import Attributes from "./Attributes/Attributes";
import * as actions from '../../../store/actions';
import Modal from "../../../components/UI/Modal/Modal";
import axios from '../../../axios-primary';

class ManageProperty extends React.PureComponent {
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
                    {label: '', value: ''},
                    {label: 'Text', value: 'text'},
                    {label: 'Select', value: 'select'}
                ]
            }
        },
        propertyAttributes: []
    };

    componentDidMount() {
        console.log('asd');
        if (this.props.propertyId) {
            axios.get('/propertyAttribute/getPropertyAttributesByPropertyId/' + this.props.propertyId)
                .then(res => {
                    this.setState({propertyAttributes: res.data});
                }).catch(err => console.log(err));
        }
    }

    onSubmit = formData => {
        formData.attributes = this.state.propertyAttributes;
        this.props.onFormSubmit(formData);
    };

    onChange = e => {
        const element = e.target;
        if (element.name === 'type') {
            this.props.onSetShowAttributes(element.value === 'select');
        }
    };

    onAddAttribute = attribute => {
        if (attribute) {
            const checkAttributeIndex = this.state.propertyAttributes.findIndex(x => x._id === attribute._id);
            if (checkAttributeIndex < 0) {
                this.setState(prevState => ({
                    propertyAttributes: [...prevState.propertyAttributes, attribute]
                }));
            }
        }
    };

    onRemoveAttribute = id => {
        this.setState(prevState => ({
            propertyAttributes: prevState.propertyAttributes.filter(item => item._id !== id)
        }));
    };

    render() {
        return (
            <Modal show={true}
                   title={'Add Property'}
                   onModalClose={this.props.onModalClose}
                   needFooter={false}>
                <div className="masonry-item">
                    <div className="bgc-white p-20 bd">
                        <DynamicForm formControls={this.state.formControls}
                                     onSubmit={model => this.onSubmit(model)}
                                     onChange={e => this.onChange(e)}
                                     onModalClose={this.props.onModalClose}
                        >
                            {
                                this.props.showAttributes ?
                                    (<Attributes attributes={this.state.propertyAttributes}
                                                 onAdd={attribute => this.onAddAttribute(attribute)}
                                                 onRemove={id => this.onRemoveAttribute(id)}/>) : null
                            }
                        </DynamicForm>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        showAttributes: state.propertyAttribute.showAttributes
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetShowAttributes: show => dispatch(actions.setShowAttribute(show))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProperty);