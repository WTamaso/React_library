import React, {Component} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import "../styles/components/Details.scss";
import {X} from "react-bootstrap-icons";

export default class Details extends Component {
    render() {
        let item = {
            title: "",
            description: "",
            pageCount: 0,
            thumbnail: {
                path: "",
                extension: ""
            }
        };

        item = this.props?.item ? this.props.item : item;
        return (
            <div className={"details-backdrop " + (this.props.show ? "modal-open" : "modal-closed")}>
                <Container>
                    <div className="comic-modal">
                        <div className="close-container">
                            <Button variant="outline-danger" className="btn-close" size="sm" onClick={(e) => {
                                this.props.callback()
                            }}><X/></Button>
                        </div>
                        <Row>
                            <Col>
                                <img src={item.thumbnail.path + "." + item.thumbnail.extension}
                                     height="550px"/>
                            </Col>
                            <Col>
                                <Row className="detail-title">
                                    <Col>
                                        <h3>{item.title}</h3>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Description: {item.description}</p>
                                        <p>Page count: {item.pageCount}</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        );
    }
}