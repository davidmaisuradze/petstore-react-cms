import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import Button from "../../components/UI/Button/Button";
import ManageProperty from "./ManageProperty/ManageProperty";
import ConfirmationDialog from "../../components/UI/ConfirmationDialog/ConfirmationDialog";

class Property extends React.Component {
    state = {
        addingProperty: false,
        propertyId: null,
        formDefaultValues: null,
        confirmationDialogOpened: false
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

    onPropertyEdit = item => {
        this.setState({
            propertyId: item._id,
            formDefaultValues: {title: item.title, type: item.type}
        }, this.toggleManageProperty);
    };

    onFormSubmit = data => {
        if (this.state.propertyId) {
            console.log(data, 'edit');
            data.id = this.state.propertyId;

            this.props.onEditProperty(data);
            this.setState({propertyId: null, formDefaultValues: null}, this.toggleManageProperty);
        } else {
            this.props.onAddProperty(data);
            this.toggleManageProperty();
        }
    };

    onPropertyDelete = id => {
        this.setState({propertyId: id}, this.toggleConfirmationModal);
    };

    onPropertyDeleteConfirmed = () => {
        this.props.onDeleteProperty(this.state.propertyId);
        this.setState({propertyId: null}, this.toggleConfirmationModal);
    };

    render() {
        const tableBody = this.props.properties.map((item, index) =>
            (
                <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.type}</td>
                    <td className={'d-flex'}>
                        <Button aclass={'btn-primary mr-1'} clicked={() => this.onPropertyEdit(item)}>edit</Button>
                        <Button aclass={'btn-danger'} clicked={() => this.onPropertyDelete(item._id)}>delete</Button>
                    </td>
                </tr>
            )
        );

        const table = tableBody && tableBody.length ? (
            <table className='table table-striped'>
                <thead>
                <tr>
                    <th>Order</th>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>{tableBody}</tbody>
            </table>
        ) : 'no entries found';

        console.log(this.state, 'state');

        return (
            <>
                <Button aclass={'btn-success'} clicked={this.toggleManageProperty}>Add New</Button>

                <ManageProperty propertyId={this.state.propertyId}
                                show={this.state.addingProperty}
                                defaultValues={this.state.formDefaultValues}
                                onFormSubmit={(data) => this.onFormSubmit(data)}
                                toggleModal={this.toggleManageProperty}/>

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
        properties: state.properties.properties
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetPropertyAttributes: () => dispatch(actions.getPropertyAttributes()),
        onGetProperties: () => dispatch(actions.getProperties()),
        onAddProperty: payload => dispatch(actions.createProperty(payload)),
        onEditProperty: payload => dispatch(actions.updateProperty(payload)),
        onDeleteProperty: id => dispatch(actions.deleteProperty(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Property);