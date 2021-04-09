import React, {Component} from "react";
import "../styles/components/Footer.scss"
import {Col, Container, Row} from "react-bootstrap";

export default class Footer extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <p>
                            Developed with <span className="heart">♥</span> by:
                            <a href="https://www.linkedin.com/in/wtamaso/">Willian P. Tamaso</a>
                        </p>
                    </Col>
                </Row>
            </Container>
        );
    }
}