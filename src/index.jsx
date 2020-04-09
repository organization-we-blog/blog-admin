import 'core-js/es/map'
import 'core-js/es/set'
import "@babel/polyfill";

import ReactDOM from "react-dom"
import React from "react"
import {HashRouter as Router} from "react-router-dom"

import App from "./App.jsx";
import "./index.css"

ReactDOM.render(<Router><App> </App></Router>, document.getElementById("app"));
