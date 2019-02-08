import React from 'react';
import {connect} from 'react-redux';
import Button from "../../../../components/UI/Button/Button";

class Properties extends React.Component {
    state = {
        selectedItem: null
    };

    onChange = e => {
        const property = this.props.properties.find(x => x._id === e.target.value);
        this.setState({selectedItem: property});
    };

    render() {
        return (
            <>
                <div className={'d-flex'}>
                    <select onChange={this.onChange}>
                        <option/>
                        {
                            this.props.properties.map(item => (
                                <option key={item._id} value={item._id}>{item.title}</option>
                            ))
                        }
                    </select>
                    <Button aclass={'btn-primary ml-1'}
                            clicked={() => this.props.onAdd(this.state.selectedItem)}>Add</Button>
                </div>

                <ul className={'list-unstyled'}>
                    {
                        this.props.categoryProperties.map(item => (
                            <li key={item._id}>
                                <span className={'span-close'}
                                      onClick={() => this.props.onRemove(item._id)}
                                >×</span> {item.title}
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
        properties: state.property.properties
    };
};

export default connect(mapStateToProps, null)(Properties);