import React from 'react';
import {connect} from 'react-redux';
import DynamicForm from "../../../components/DynamicForm/DynamicForm";
import Attributes from "./Attributes/Attributes";
import axios from '../../../axios-primary';

import {setShowAttribute} from "../../../store/actions";

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
                    {label: '', value: ''},
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

    onChange = e => {
        this.props.onSetShowAttributes(e.target.value === 'select');
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
                <div className="masonry-item">
                    <div className="bgc-white p-20 bd">
                        <DynamicForm formControls={this.state.formControls}
                                     defaultValues={this.props.defaultValues}
                                     onSubmit={model => this.onSubmit(model)}
                                     onChange={e => this.onChange(e)}
                                     onModalClose={this.props.onModalClose}
                        >
                            {
                                this.props.showAttributes ?
                                    (<Attributes attributes={this.state.attributes}
                                                 onAdd={attribute => this.onAddAttribute(attribute)}
                                                 onRemove={id => this.onRemoveAttribute(id)}
                                    />) : null
                            }
                        </DynamicForm>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        showAttributes: state.propertyAttribute.showAttributes,
        defaultValues: state.global.formDefaultValues
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetShowAttributes: show => dispatch(setShowAttribute(show))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProperty);