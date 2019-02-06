import React from 'react';
import {connect} from 'react-redux';
import DynamicForm from "../../../components/DynamicForm/DynamicForm";
import Attributes from "./Attributes/Attributes";
import * as actions from '../../../store/actions';

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
        }
    };

    onSubmit = formData => {
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
            this.props.onAddAttributesByPropertyId(attribute);
        }
    };

    onRemoveAttribute = id => {
        this.props.onRemoveAttributesByPropertyId(id);
    };

    render() {
        return (
            <div>
                <div className="masonry-item">
                    <div className="bgc-white p-20 bd">
                        <DynamicForm formDefaultValues={this.props.formDefaultValues}
                                     formControls={this.state.formControls}
                                     onSubmit={model => this.onSubmit(model)}
                                     onChange={e => this.onChange(e)}
                                     onModalClose={this.props.onModalClose}
                        >
                            {
                                this.props.showAttributes ?
                                    (<Attributes attributes={this.props.attributesByPropertyId}
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
        defaultValues: state.global.formDefaultValues,
        attributesByPropertyId: state.propertyAttribute.attributesByPropertyId,
        formDefaultValues: state.global.formDefaultValues
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetShowAttributes: show => dispatch(actions.setShowAttribute(show)),
        onAddAttributesByPropertyId: item => dispatch(actions.addAttributesByPropertyId(item)),
        onRemoveAttributesByPropertyId: id => dispatch(actions.removeAttributesByPropertyId(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProperty);