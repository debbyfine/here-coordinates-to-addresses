// src/DisplayMapClass.js
import * as React from 'react';

/**
 * @author Tina Lüthe
 * Map Component which handles the whole Map functionality.
 */
export class Map extends React.Component {
    //reference for the map
    mapRef = React.createRef();

    /**
     * Constructor which gets props and sets the state.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            ui: null
        }
    }

    /**
     * Function, which is called when a file with new positions was dropped. It removes old markers and creates new
     * ones.
     * @param newPositions
     */
    changePositions(newPositions) {
        // get map and remove the markers
        let map = this.state.map;
        if (map != null) {
            map.removeObjects(map.getObjects());
        }

        // create new markers from the positions
        let markers = [];
        for (const pos of newPositions) {
            const marker = new window.H.map.Marker({lat:pos.latitude, lng:pos.longitude});
            // set data to name, so it can be accessed for more information
            marker.setData('<div>' + pos.name + '</div>');
            markers.push(marker);
        }
        // add markers to the map
        this.createMap(markers);
    }

    /**
     * Function which sets the markers to the map.
     * @param markers
     */
    createMap(markers) {
        // get existing map and ui
        const map = this.state.map;
        const ui = this.state.ui;
        // create new group
        let group = new window.H.map.Group();

        //add group to the map
        map.addObject(group);

        // add an event listener to each marker
        // this shows the name for each marker, when it is clicked on
        group.addEventListener('tap', function (evt) {
            // create information field, add data to it and add to the UI
            let information =  new window.H.ui.InfoBubble(evt.target.getGeometry(), {
                content: evt.target.getData()
            });
            ui.addBubble(information);
        }, false);

        // add each marker to the group
        for (const marker of markers) {
            group.addObject(marker);
        }

        // set new map and UI
        this.setState({ map: map, ui: ui});
    }

    /**
     * Function, which is called when component has been mount. It creates the map.
     */
    componentDidMount() {
        const H = window.H;
        const platform = new H.service.Platform({
            apikey: "{DaTDB0YnlcvZRk8AF7tCZFOrsOBY4LVLyY2hWBOI3O0}"
        });

        const defaultLayers = platform.createDefaultLayers();

        // create map and set its positions
        const map = new H.Map(
            this.mapRef.current,
            defaultLayers.vector.normal.map,
            {
                center: { lat: 50, lng: 5 },
                zoom: 4,
                pixelRatio: window.devicePixelRatio || 1
            }
        );

        // add map events, to ensure zooming, etc.
        const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

        // create UI, so the user is able to interact
        const ui = H.ui.UI.createDefault(map, defaultLayers);

        // set map and ui to state, so it can be used later
        this.setState({ map: map, ui: ui});
    }

    /**
     * Function, which is called when the component is going to be unmount. Disposes the map.
     */
    componentWillUnmount() {
        this.state.map.dispose();
    }

    /**
     * Function which renders the HTML elements.
     * @returns {*}
     */
    render() {
        return <div ref={this.mapRef} style={{height: '100vh'}} />;
    }
}