import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import Button from "../../components/UI/Button/Button";
import ManageAttribute from "./ManageAttribute/ManageAttribute";
import ConfirmationDialog from "../../components/UI/ConfirmationDialog/ConfirmationDialog";

class PropertyAttributes extends React.Component {
    state = {
        addingAttribute: false,
        attributeId: null,
        confirmationDialogOpened: false
    };

    componentDidMount() {
        this.props.onGetPropertyAttributes();
    }

    toggleManageAttribute = () => {
        this.setState(state => ({
            addingAttribute: !state.addingAttribute
        }));
    };

    toggleConfirmationModal = () => {
        this.setState(state => ({
            confirmationDialogOpened: !state.confirmationDialogOpened
        }));
    };

    onAttributeAdd = () => {
        this.props.onSetFormDefaultValues({value: '', type: ''});
        this.toggleManageAttribute();
    };

    onAttributeEdit = item => {
        this.props.onSetFormDefaultValues({value: item.value, type: item.type});
        this.setState({attributeId: item._id}, this.toggleManageAttribute);
    };

    onFormSubmit = data => {
        console.log(data, 'dataaaaaaaaaaaaaaaa');
        if (this.state.attributeId) {
            data.id = this.state.attributeId;
            this.props.onEditAttribute(data);
            this.toggleManageAttribute();
        } else {
            this.props.onAddAttribute(data);
            this.toggleManageAttribute();
        }
    };

    onAttributeDelete = id => {
        this.setState({attributeId: id}, this.toggleConfirmationModal);
    };

    onAttributeDeleteConfirmed = () => {
        this.props.onDeleteAttribute(this.state.attributeId);
        this.setState({attributeId: null}, this.toggleConfirmationModal);
    };

    render() {
        const tableBody = this.props.propertyAttributes.map((item, index) =>
            (
                <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.value}</td>
                    <td>{item.type}</td>
                    <td className={'d-flex'}>
                        <Button aclass={'btn-primary mr-1'} clicked={() => this.onAttributeEdit(item)}>edit</Button>
                        <Button aclass={'btn-danger'} clicked={() => this.onAttributeDelete(item._id)}>delete</Button>
                    </td>
                </tr>
            )
        );

        const table = tableBody && tableBody.length ? (
            <table className='table table-striped'>
                <thead>
                <tr>
                    <th>Order</th>
                    <th>Value</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>{tableBody}</tbody>
            </table>
        ) : 'no entries found';

        return (
            <>
                <Button aclass={'btn-success'} clicked={this.onAttributeAdd}>Add New</Button>

                <ManageAttribute onFormSubmit={(data) => this.onFormSubmit(data)}
                                 show={this.state.addingAttribute}
                                 toggleModal={this.toggleManageAttribute}
                />

                <ConfirmationDialog show={this.state.confirmationDialogOpened}
                                    closeModal={this.toggleConfirmationModal}
                                    acceptModal={this.onAttributeDeleteConfirmed}
                >
                    Delete this attribute?
                </ConfirmationDialog>

                {table}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        propertyAttributes: state.propertyAttribute.propertyAttributes
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetPropertyAttributes: () => dispatch(actions.getPropertyAttributes()),
        onAddAttribute: payload => dispatch(actions.createPropertyAttribute(payload)),
        onEditAttribute: payload => dispatch(actions.updatePropertyAttribute(payload)),
        onDeleteAttribute: id => dispatch(actions.deletePropertyAttribute(id)),
        onSetFormDefaultValues: payload => dispatch(actions.setFormDefaultValues(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyAttributes);