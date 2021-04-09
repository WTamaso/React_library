import React, {Component} from "react";
import "./styles/App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";
import {
    Route,
    HashRouter
} from "react-router-dom";
import Home from "./pages/Home";
import Comics from "./pages/Comics";
import Characters from "./pages/Characters";
import Creators from "./pages/Creators";

export default class Main extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Header/>
                    <Content>
                        <Route exact path="/" component={Home}/>
                        <Route path="/comics" component={Comics}/>
                        <Route path="/characters" component={Characters}/>
                        <Route path="/Creators" component={Creators}/>
                    </Content>
                    <Footer/>
                </div>
            </HashRouter>
        );
    }
}