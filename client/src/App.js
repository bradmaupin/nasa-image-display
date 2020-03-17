import React, { Component } from 'react'
import './App.css'
import ImageList from './components/imageList'
import ImageDisplay from './components/imageDisplay'
import Promise from 'bluebird'

class App extends Component {
    state = {
        loading: false,
        images: [],
        page: 0,
        total: 0
    }

    pageSize = 100

    searchTerm = "apollo 11"

    componentDidMount() {
        this.loadImages(1);
    }

    loadImages = (page) => {
        const query = {
            page: page,
            searchTerm: this.searchTerm
        };

        this.setState({loading: true});

        this.getImagesFetch(query)
            .then(result => {
                this.setState({
                    loading: false,
                    images: result.images,
                    page: page,
                    total: result.total,
                    selectedImage: undefined
                });
            })
            .catch(err => {
                this.setState({loading: false});
                this.showError(err);
            });
    }

    getImagesFetch = (query) => {
        return new Promise((resolve, reject) => {
            var url = "https://images-api.nasa.gov/search?media_type=image&q=" + query.searchTerm;
            if (query.page > 1) {
                url += "&page=" + query.page;
            }

            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(response => {
                resolve({
                    images: this.xfrm(response.collection.items),
                    total: response.collection.metadata.total_hits
                });
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    showError = (err) => {
        console.log(err);
    }

    xfrm = (images) => {
        var items = [];
        images.forEach((image) => {
            var item = { ...image.data[0] }; // copy
            image.links.some((link) => {
                if (link.render === "image" && link.rel === "preview") {
                    item.url = link.href;
                    return true; //stop iteration
                }
                return false;
            });
            items.push(item);
        });
        return items;
    }

    handleListClick = (index) => {
        this.setState({selectedImage: this.state.images[index]});
    }

    handlePrev = () => {
        this.loadImages(this.state.page - 1);
    }

    handleNext = () => {
        this.loadImages(this.state.page + 1);
    }

    render() {
        var firstResult = (this.state.page - 1) * this.pageSize + 1,
            lastResult = this.state.page * this.pageSize;
        if (firstResult < 0) {
            firstResult = 0;
        }
        if (lastResult > this.state.total) {
            lastResult = this.state.total;
        }
        return (
            <div className="app">
                <div className={"load-container" + (this.state.loading ? "" : " hidden")}>
                    <div className="load-mask"/>
                    <div className="load-indicator">
                            Loading&nbsp;
                            <span className="glyphicon glyphicon-refresh refresh-animate"/>
                    </div>
                </div>
                <div className="component-container">
                    <div className="left-column">
                        <div className="page-container">
                            <div className="page-info">
                                {"showing " + firstResult + " - " + lastResult + " of " + (this.state.total || 0) + " total results" }
                            </div>
                            <div className="button-container">
                                <button disabled={this.state.page <= 1} onClick={this.handlePrev}>Prev Page</button>
                                <button disabled={lastResult === this.state.total} onClick={this.handleNext}>Next Page</button>
                            </div>
                        </div>
                        <ImageList 
                            images={this.state.images}
                            onItemClick={this.handleListClick}
                            ref={(ref) => this.imageList = ref}
                        />
                    </div>
                    <ImageDisplay
                        image={this.state.selectedImage}
                    />
                </div>
            </div>
        );
    }

}

export default App;
