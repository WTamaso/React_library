import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import "../styles/components/Header.scss";
import {Col, Container, Row} from "react-bootstrap";
import {Files} from "react-bootstrap-icons";
import logo from "../images/marvel-library-ext.png";

export default class Header extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>
                            <img className="main-logo" src={logo} alt="Marvel Library logo" />
                        </h1>
                    </Col>
                    <Col>
                        <ul>
                            <li>
                                <NavLink to="/"><Files/> Comics</NavLink>
                            </li>
                            {/*<li>
                                <NavLink exact to="/" className="test"><HouseFill/> Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/comics"><Files/> Comics</NavLink>
                            </li>*/}
                            {/*<li>
                                <NavLink to="/characters"><PeopleFill/> Characters</NavLink>
                            </li>
                            <li>
                                <NavLink to="/creators"><PersonBadgeFill/> Creators</NavLink>
                            </li>*/}
                        </ul>
                    </Col>
                </Row>
            </Container>
        );
    }
}