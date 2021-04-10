import React, {Component} from "react";
import "../styles/components/Error.scss";
import {Alert} from "react-bootstrap";

export default class Error extends Component {
    render() {
        return (
            <div className="error-backdrop">
                <div className="error-container">
                    <Alert dismissible={true} variant="danger" onClose={this.props.callback}>
                        <Alert.Heading>Error!</Alert.Heading>
                        <p>
                            {this.props.error.message}
                        </p>
                    </Alert>
                </div>
            </div>
        );
    }
}