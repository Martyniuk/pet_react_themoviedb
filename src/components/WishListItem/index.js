// Core
import React, { Component } from 'react';

// instruments
import { func, number, string } from 'prop-types';
import Styles from './styles.scss';

export default class WishListItem extends Component {
    static propTypes = {
        deleteFromWishList: func.isRequired,
        id:                 number.isRequired,
        title:              string.isRequired
    };
    constructor () {
        super();
        this.handleDeletionFromWishList = ::this._handleDeleteFromWishList;
    }

    _handleDeleteFromWishList (e) {
        e.preventDefault();
        const { deleteFromWishList, id } = this.props;

        console.log(`deleteFromWishList`);
        deleteFromWishList(id);
    }

    render () {
        const { title } = this.props;

        return (
            <li className = { Styles.wishList_item }>
                { title }
                <span className = { Styles.delete } onClick = { this.handleDeletionFromWishList }>[x]</span>
            </li>
        );
    }
}
