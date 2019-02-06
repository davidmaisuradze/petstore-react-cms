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
        console.log(this.props.attributes,'attributes');
        return (
            <>
                <div className={'d-flex'}>
                    <select onChange={this.onChange}>
                        <option/>
                        {
                            this.props.allAttributes.map(item => (
                                <option key={item._id} value={item._id}>{item.value}</option>
                            ))
                        }
                    </select>
                    <Button aclass={'btn-primary ml-1'}
                            clicked={() => this.props.onAdd(this.state.selectedPropertyAttribute)}>Add</Button>
                </div>

                <ul className={'list-unstyled'}>
                    {
                        this.props.attributes.map(item => (
                            <li key={item._id}>
                                <span className={'span-close'}
                                      onClick={() => this.props.onRemove(item._id)}
                                >×</span> {item.value}
                            </li>
                        ))
                    }
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