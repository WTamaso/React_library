import React, {Component} from "react";
import "../styles/components/Footer.scss"
import {Col, Container, Row} from "react-bootstrap";

export default class Characters extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h2>Characters</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        ;)
                    </Col>
                </Row>
            </Container>
        );
    }
}