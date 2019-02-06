import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import Button from "../../components/UI/Button/Button";
import ManageProperty from "./ManageProperty/ManageProperty";
import ConfirmationDialog from "../../components/UI/ConfirmationDialog/ConfirmationDialog";
import Modal from "../../components/UI/Modal/Modal";

class Property extends React.Component {
    state = {
        addingProperty: false,
        confirmationDialogOpened: false,
        propertyId: null
    };

    componentDidMount() {
        this.props.onGetProperties();
        this.props.onGetPropertyAttributes();
    }

    toggleManageProperty = () => {
        this.setState(state => ({
            addingProperty: !state.addingProperty
        }));
    };

    toggleConfirmationModal = () => {
        this.setState(state => ({
            confirmationDialogOpened: !state.confirmationDialogOpened
        }));
    };

    onPropertyAdd = () => {
        this.props.onResetPropertyAttributes();
        this.props.onSetFormDefaultValues({title: '', type: ''});
        this.setState({propertyId: null}, this.toggleManageProperty);
    };

    onPropertyEdit = item => {
        this.props.onGetPropertyAttributesByPropertyId(item._id);
        this.props.onSetFormDefaultValues({title: item.title, type: item.type});
        this.props.onSetShowAttributes(item.type === 'select');
        this.setState({propertyId: item._id}, this.toggleManageProperty);
    };

    onFormSubmit = data => {
        if (this.state.propertyId) {
            data.id = this.state.propertyId;
            data.attributes = this.props.attributesByPropertyId.map(item => item._id);
            this.props.onEditProperty(data);
        } else {
            this.props.onAddProperty(data);
        }
        this.setState({propertyId: null, formDefaultValues: null}, this.toggleManageProperty);
    };

    onPropertyDelete = id => {
        this.setState({propertyId: id}, this.toggleConfirmationModal);
    };

    onPropertyDeleteConfirmed = () => {
        this.props.onDeleteProperty(this.state.propertyId);
        this.setState({propertyId: null}, this.toggleConfirmationModal);
    };

    render() {
        const table = this.props.properties && this.props.properties ? (
            <table className='table table-striped'>
                <thead>
                <tr>
                    <th>Order</th>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {this.props.properties.map((item, index) =>
                    (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.title}</td>
                            <td>{item.type}</td>
                            <td className={'d-flex'}>
                                <Button aclass={'btn-primary mr-1'}
                                        clicked={() => this.onPropertyEdit(item)}>edit</Button>
                                <Button aclass={'btn-danger'}
                                        clicked={() => this.onPropertyDelete(item._id)}>delete</Button>
                            </td>
                        </tr>
                    )
                )}
                </tbody>
            </table>
        ) : 'no entries found';

        return (
            <>
                <Button aclass={'btn-success'} clicked={this.onPropertyAdd}>Add New</Button>

                <Modal show={this.state.addingProperty}
                       title={'Add Property'}
                       onModalClose={this.toggleManageProperty}
                       needFooter={false}>
                    <ManageProperty onFormSubmit={(data) => this.onFormSubmit(data)}
                                    onModalClose={this.toggleManageProperty}/>
                </Modal>

                <ConfirmationDialog show={this.state.confirmationDialogOpened}
                                    closeModal={this.toggleConfirmationModal}
                                    acceptModal={this.onPropertyDeleteConfirmed}
                >
                    Delete this property?
                </ConfirmationDialog>

                {table}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        properties: state.properties.properties,
        attributesByPropertyId: state.propertyAttribute.attributesByPropertyId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetPropertyAttributes: () => dispatch(actions.getPropertyAttributes()),
        onGetPropertyAttributesByPropertyId: id => dispatch(actions.getPropertyAttributesByPropertyId(id)),
        onResetPropertyAttributes: () => dispatch(actions.resetAttributesByPropertyId()),
        onGetProperties: () => dispatch(actions.getProperties()),
        onAddProperty: payload => dispatch(actions.createProperty(payload)),
        onEditProperty: payload => dispatch(actions.updateProperty(payload)),
        onDeleteProperty: id => dispatch(actions.deleteProperty(id)),
        onSetShowAttributes: show => dispatch(actions.setShowAttribute(show)),
        onSetFormDefaultValues: payload => dispatch(actions.setFormDefaultValues(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Property);