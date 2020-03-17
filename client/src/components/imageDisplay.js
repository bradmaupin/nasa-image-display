import React, { Component } from 'react';

class ImageDisplay extends Component {

    render() {
        var {image} = this.props;
        return (
            image ? 
                (<div className="image-display-container">
                    <img className="image-image" src={image.url} alt={image.title}/>
                    <div className="image-title center">
                        <span className="meta-label">Title: </span>
                        <span>{image.title}</span>
                    </div>
                    <div className="image-description center">
                        <span className="meta-label">Description: </span>
                        <span>{image.description}</span>
                    </div>
                    <div className="image-location center">
                        <span className="meta-label">Location: </span>
                        <span>{image.location}</span>
                    </div>
                    <div className="image-center center">
                        <span className="meta-label">Center: </span>
                        <span>{image.center}</span>
                    </div>
                    <div className="image-photographer center">
                        <span className="meta-label">Photographer: </span>
                        <span>{image.photographer}</span>
                    </div>
                </div>)
                : 
                <div/>
        );
    }

}

export default ImageDisplay;