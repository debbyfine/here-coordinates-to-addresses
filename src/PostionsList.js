import React, { Component } from 'react'
import DragDrop from './DragDrop'

/**
 * @author Tina Lüthe
 * Map Component which handles the whole list with positions functionality.
 */
class PositionsList extends Component {
    // hardcoded API key
    restApiKey = "kfu3Jby7KkRNhy2wgQcUofppTXl_Mj1wuVcIe6Otpi8";

    // state which contains array of all positions
    state = {
        positions: []
    };

    /**
     * Callback Function which handles the event, when a file has been dropped. It reads out the file, gets the
     * addresses from the REST Service and creates new objects to use them in the list.
     * @param files
     */
    handleDrop = (files) => {
        //create empty list and set to state
        let positionList = [];
        this.setState({positions: positionList});
        // read out every file dropped
        for (const file of files) {
            // check file type
            if (!file.type) return;
            if (file.type === "application/json") {
                file.text().then((text) => {
                    try {
                        // turn text into JSON format
                        const dataJson = JSON.parse(text);
                        // for each position get the address
                        for (const pos of dataJson) {
                            this.coordinatesToAddress(pos.Latitude, pos.Longitude).then((address) => {
                                // create new object
                                const position = {
                                    name: pos.Name,
                                    latitude: pos.Latitude,
                                    longitude: pos.Longitude,
                                    address: address
                                };
                                // add object to list, update state
                                positionList.push(position);
                                this.setState({positions: positionList});
                                this.props.changedPositions(positionList);
                            });
                        }
                    } catch (e) {
                        console.error(e.message());
                    }
                });
            }
        }
    };

    /**
     * Function which gets the address from a position with the REST Service of HERE Technologies.
     * @param lat
     * @param long
     * @returns {Promise<any>}
     */
    coordinatesToAddress(lat, long) {
        const url = 'https://revgeocode.search.hereapi.com/v1/revgeocode?at=' + lat + '%2C' + long + '&lang=en-US&apikey=' + this.restApiKey;
        return new Promise(function (resolve, reject) {
            fetch(url)
                .then(response => response.json())
                .then((data) => {
                    // return Promise with address
                    resolve(data.items[0].title);
                });
        });
    }

    /**
     * Function which renders the HTML elements.
     * @returns {*}
     */
    render() {
        return (
            <DragDrop handleDrop={this.handleDrop}>
                    <div className="list">
                        <ol className="positions-list">
                            {this.state.positions && this.state.positions.map((position, i) =>
                                <li key={i}>
                                    <h4><b>{position.name}</b></h4>
                                    <p>{position.address}</p>
                                </li>
                            )}
                        </ol>
                    </div>
            </DragDrop>
        )
    }
}
export default PositionsList