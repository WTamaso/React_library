import React, {Component} from "react";
import "../styles/components/Footer.scss"

export default class Footer extends Component {
    render() {
        return (
            <div>
                <p>Developed with <span className="heart">♥</span> by: <a href="https://www.linkedin.com/in/wtamaso/">Willian P. Tamaso</a></p>
            </div>
        );
    }
}