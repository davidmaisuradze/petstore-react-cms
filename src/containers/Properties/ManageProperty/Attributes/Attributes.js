import React from 'react';
import {connect} from 'react-redux';
import Button from "../../../../components/UI/Button/Button";

class Attributes extends React.Component {
    state = {
        selectedPropertyAttribute: ''
    };

    onChange = e => {
        const attribute = this.props.allAttributes.find(x => x._id === e.target.value);
        this.setState({selectedPropertyAttribute: attribute});
    };

    render() {
        const attributesDropDown = this.props.allAttributes.map(item => (
            <option key={item._id} value={item._id}>{item.value}</option>
        ));

        const attributesList = this.props.attributes.map(item => (
            <li key={item._id}>{item.value}</li>
        ));

        return (
            <>
                <div className={'d-flex'}>
                    <select onChange={this.onChange}>
                        <option></option>
                        {attributesDropDown}
                    </select>
                    <Button aclass={'btn-primary'}
                            clicked={() => this.props.onAdd(this.state.selectedPropertyAttribute)}>Add</Button>
                </div>
                <ul>
                    {attributesList}
                </ul>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        allAttributes: state.propertyAttribute.propertyAttributes
    };
};

export default connect(mapStateToProps, null)(Attributes);