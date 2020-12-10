import logo from './logo.svg';
import './App.css';
import PositionsList from './PostionsList'
import {Map} from './Map'
import React, { Component } from 'react'

/**
 * @author Tina Lüthe
 * DragDropPage Component, which contains the Map and PositionsList and makes one page and component out of them.
 */
class DragDropPage extends Component {

    /**
     * Constructor which gets props and also creates a reference for the Map-child.
     * @param props
     */
    constructor(props) {
        super(props);
        this.child = React.createRef();
    }

    /**
     * Callback to get the list of positions from the PositionsList child.
     * @param positionsList
     */
    changedPositions = (positionsList) => {
        // when positionsList, pass it to the map child
        this.child.current.changePositions(positionsList);
    };

    /**
     * Function which renders the HTML elements.
     * @returns {*}
     */
    render() {
        return (
            <div>
                <div className="drag-drop">
                    <PositionsList changedPositions={this.changedPositions}/>
                </div>
                <div className="map">
                    <Map ref={this.child}/>
                </div>
            </div>
        );
    }
}

export default DragDropPage;