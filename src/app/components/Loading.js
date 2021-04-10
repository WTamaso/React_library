import React, {Component} from "react";
import {Spinner} from "react-bootstrap";
import "../styles/components/Loading.scss";

export default class Loading extends Component {
    render() {
        return (
            <div className="loading-backdrop">
                <div className="spinner-container">
                    <Spinner animation="border" variant="danger"/>
                </div>
            </div>
        );
    }
}