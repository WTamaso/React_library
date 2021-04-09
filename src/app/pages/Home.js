import React, {Component} from "react";
import "../styles/components/Header.scss";
import {Col, Container, Row} from "react-bootstrap";

export default class Home extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h2>Homepage</h2>
                    </Col>
                </Row>
            </Container>
        );
    }
}