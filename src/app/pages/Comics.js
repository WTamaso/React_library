import React, {Component} from "react";
import "../styles/components/Footer.scss"
import {Col, Container, Row} from "react-bootstrap";

export default class Content extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h2>Comics</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        :D
                    </Col>
                </Row>
            </Container>
        );
    }
}