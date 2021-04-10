import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";
import {HashRouter, Route} from "react-router-dom";
import Comics from "./pages/Comics";
import Characters from "./pages/Characters";
import Creators from "./pages/Creators";

export default class Main extends Component {
    render() {
        return (
            <HashRouter>
                <Header/>
                <Content>
                    {/*<Route exact path="/" component={Home}/>
                    <Route path="/comics" component={Comics}/>*/}
                    <Route exact path="/" component={Comics}/>
                    <Route path="/characters" component={Characters}/>
                    <Route path="/Creators" component={Creators}/>
                </Content>
                <Footer/>
            </HashRouter>
        );
    }
}