// Core
import React, { Component } from 'react';

// instruments
import { func, number, string } from 'prop-types';
import Styles from './styles.scss';

export default class WishListItem extends Component {
    static propTypes = {
        deleteMovieFromWishList: func.isRequired,
        id:                      number.isRequired,
        title:                   string.isRequired
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
            <li className = { Styles.wishList_item }>
                { title }
                <span className = { Styles.delete } onClick = { this.handleMovieDeletionFromWishList }>[x]</span>
            </li>
        );
    }
}
