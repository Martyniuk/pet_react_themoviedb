// Core
import React, { Component } from 'react';

// instruments
import PropTypes from 'prop-types';
import Styles from './styles.scss';

// components

export default class WishListItem extends Component {
    static propTypes = {
        deleteMovieFromWishList: PropTypes.func.isRequired,
        id:                      PropTypes.number.isRequired,
        title:                   PropTypes.string.isRequired
    };

    constructor () {
        super();
        this.handleMovieDeletionFromWishList = ::this._handleDeleteMovieFromWishList;
    }

    _handleDeleteMovieFromWishList (e) {
        e.preventDefault();
        const { deleteMovieFromWishList, id } = this.props;

        deleteMovieFromWishList(id);
    }

    render () {
        const { title } = this.props;

        return (
            <li>
                { title }
                <span className = { Styles.delete } onClick = { this.handleMovieDeletionFromWishList }>[x]</span>
            </li>
        );
    }
}