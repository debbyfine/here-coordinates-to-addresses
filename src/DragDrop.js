import React, { Component } from 'react'

/**
 * @author Tina Lüthe
 * DragDrop Component, which contains and handles the drag and drop functionality.
 */
class DragDrop extends Component {
    // reference for a container
    dropRef = React.createRef();
    // state, that contains two states
    state = {
        dragging: false,
        emptyList: true
    };

    /**
     * Callback function to handle the events called when being dragged.
     * @param e
     */
    handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    /**
     * Callback function to handle the events, if something is being dragged in.
     * @param e
     */
    handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter++;
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.setState({dragging: true, emptyList: true});
        }
    };

    /**
     * Callback function to handle the events, if something is dragged out of the div.
     * @param e
     */
    handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter--;
        if (this.dragCounter > 0) return;
        this.setState({dragging: false, emptyList: true});
    };

    /**
     * Callback function to handle events, if something was dropped inside div.
     * @param e
     */
    handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({dragging: false, emptyList: false});
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            this.props.handleDrop(e.dataTransfer.files);
            e.dataTransfer.clearData();
            this.dragCounter = 0;
        }
    };

    /**
     * Function, which is called when component has been mount. Sets event listeners and variables.
     */
    componentDidMount() {
        this.dragCounter = 0;
        let div = this.dropRef.current;
        div.addEventListener('dragenter', this.handleDragIn);
        div.addEventListener('dragleave', this.handleDragOut);
        div.addEventListener('dragover', this.handleDrag);
        div.addEventListener('drop', this.handleDrop);
    }

    /**
     * Function, which is called when the component is going to be unmount. Removes all event listeners.
     */
    componentWillUnmount() {
        let div = this.dropRef.current;
        div.removeEventListener('dragenter', this.handleDragIn);
        div.removeEventListener('dragleave', this.handleDragOut);
        div.removeEventListener('dragover', this.handleDrag);
        div.removeEventListener('drop', this.handleDrop);
    }

    /**
     * Function which renders the HTML elements.
     * @returns {*}
     */
    render() {
        return (
            <div ref={this.dropRef} style={{
                display: 'inline-block',
                position: 'relative',
                width: '100%',
                height: '100%'
            }}>
                {this.state.emptyList &&
                <div className="drop-container-border" style={{
                    border: 'dashed grey 4px',
                    backgroundColor: 'rgba(255,255,255,.8)',
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 9999}}>
                    <div style={{
                        position: 'absolute',
                        top: '25%',
                        right: 0,
                        left: 0,
                        textAlign: 'center',
                        color: 'grey',
                        fontSize: 36}}>
                        <div>drop a file with coordinates here</div>
                    </div>
                </div>
                }
                {this.props.children}
            </div>
        )
    }
}
export default DragDrop