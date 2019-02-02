import React from 'react';

class ErrorMessage extends React.Component {
    state = {show: true};

    componentDidMount() {
        setTimeout(() => {
            this.setState({show: false});
        }, 2000);
    }

    render() {
        const message = this.state.show ?
            (
                <div className="error-message position-absolute alert alert-danger mt-2 mr-2" role="alert">
                    {this.props.message}
                </div>
            ) : null;

        return (<>{message}</>)
    }
}

export default ErrorMessage;
