import React, { Component } from 'react';

class ImageList extends Component {

    state = {
        selectedIndex: undefined
    }

    render() {
        //clear selectedIndex on reload
        if (this.lastList !== this.props.images) {
            this.setState({selectedIndex: undefined});
        }
        this.lastList = this.props.images;

        return (
            <div className="image-list-container">
                <ul 
                    className="image-list" 
                    onScroll={this.handleScroll}
                    ref={(ref) => this.elCardList = ref}
                    tabindex="0"
                    onKeyDown={this.handleKeyDown}
                >
                    {this.props.images.map((image, i) => {
                        return (
                            <li className={this.state.selectedIndex === i ? "selected" : ""} onClick={this.handleClick} data-index={i}>
                                {image.title}
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

    handleClick = (e) => {
        var index = parseInt(e.target.dataset.index, 10);
        this.doClick(index);
    }

    doClick = (index) => {
        this.setState({selectedIndex: index});
        if (this.props.onItemClick) {
            this.props.onItemClick(index);
        }
    }

    /**
     * Provide shift+up-arrow/down-arrow selection change.
     */
    handleKeyDown = (e) => {
        var index = this.state.selectedIndex;
        if (!e.shiftKey) {
            return;
        }
        if (e.keyCode === 38) { //up
            if (index > 0) {
                index -= 1;
            } else {
                return;
            }
        } else if (e.keyCode === 40) { //down
            if ((index + 1) < this.props.images.length) {
                index += 1;
            } else {
                return;
            }
        } else {
            return;
        }
        this.doClick(index);
    }

}

export default ImageList;