// Core
import React, { Component } from 'react';

// instruments
import Styles from './styles.scss';

// components
import SearchBar from '../SearchBar';

export default class Body extends Component {


    /*

    1. Move fetch here
        1) write method, throw to SearchBar and then call it from searchBar component and save in State
        2) Move fetchs related to Popupar and Newest here. Held in in state and view in Content.
        3) Spinner the same
    2. state:
        moviesInWishList

        methonds:
           deleteFromWishList
           addToWishList
    */
    render () {

        return (
            <section className = { Styles.main }>
                <div>
                    <SearchBar />
                    {/* Content */}
                </div>
            </section>
        );
    }
}
