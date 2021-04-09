import React, {Component} from "react";
import {
    NavLink
} from "react-router-dom";
import "../styles/components/Header.scss";

export default class Header extends Component {
    render() {
        return (
            <div>
                <div>
                    <h1>
                        Marvel Library
                    </h1>
                </div>
                <div>
                    <ul>
                        <li>
                            <NavLink exact to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/comics">Comics</NavLink>
                        </li>
                        <li>
                            <NavLink to="/characters">Characters</NavLink>
                        </li>
                        <li>
                            <NavLink to="/creators">Creators</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}