import React, {Component} from "react";
import "../styles/components/Footer.scss"

export default class Content extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}