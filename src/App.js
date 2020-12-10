import logo from './logo.svg';
import './App.css';
import PositionsList from './PostionsList'
import {Map} from './Map'
import React, { Component } from 'react'
import DragDropPage from "./DragDropPage";

/**
 * @author Tina Lüthe
 * App Component, which contains the whole App.
 */
class App extends Component {

    /**
     * Function which renders the HTML elements.
     * @returns {*}
     */
    render() {
        return (
            <div className="App">
                <DragDropPage/>
            </div>
        );
    }
}

export default App;
