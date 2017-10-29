// Core
import React, { Component } from 'react';
// Instruments
import { array, func } from 'prop-types';
import Styles from './styles.scss';
// Components

export default class WishList extends Component {
    static propTypes = {
        deleteMovieFromWishList: func.isRequired,
        wishList:                array
    };

    constructor () {
        super();

        this.handleDeletionFromWishList = ::this._handleDeletionFromWishList;
    }

    _handleDeletionFromWishList (e) {
        e.preventDefault();

    }
    //constructor
    //create input button for deletion a movie from WishList
    //use Transition in order to implement animation

    render () {
        const { wishList } = this.props;

        const moviesInList = wishList.map(
            (movie) => {
                return (
                    <li className = { Styles.itemInWishList } key = { movie.id }>
                        {movie.title}
                        <span className = { Styles.delete } onClick = { this.handleDeletionFromWishList } />
                    </li>
                )});

        return (
            <ol> {moviesInList} </ol>
        );
    }
}