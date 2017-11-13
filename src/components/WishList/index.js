// Core
import React, { Component } from 'react';
// Instruments
import { bool, array } from 'prop-types';
import Styles from './styles.scss';
import {
    CSSTransition,
    TransitionGroup
} from 'react-transition-group';
// Components
import WishListItem from '../WishListItem';

export default class WishList extends Component {
    static propTypes = {
        wishList: array
    };
    constructor () {
        super();
        this.deleteMovieFromWishList = ::this._deleteMovieFromWishList;
    }
    state = {
        dataUpdate: false
    };
    _deleteMovieFromWishList (movieId) {
        const wishListCurrent = JSON.parse(localStorage.getItem('wishList'));
        const wishList = wishListCurrent.filter((movie) => movie.id !== movieId);

        console.log(`before updating state --> ${this.state.dataUpdate}`);
        this.setState(() => ({ dataUpdate: true }));
        console.log(`after updating state --> ${this.state.dataUpdate}`);
        localStorage.setItem('wishList', JSON.stringify(wishList));
    }

    render () {
        const { wishList } = this.props;
        let tmpMoviesInList = [];

        if (wishList) {
            tmpMoviesInList = wishList.map(
                (movie) => (
                    <CSSTransition
                        classNames = { {
                            enter:       Styles.itemInStart,
                            enterActive: Styles.itemInEnd,
                            exit:        Styles.itemOutStart,
                            exitActive:  Styles.itemOutEnd
                        } }
                        key = { movie.id }
                        timeout = { { enter: 700, exit: 600 } }>
                        <WishListItem
                            deleteFromWishList = { this.deleteMovieFromWishList }
                            id = { movie.id }
                            title = { movie.title }
                        />
                    </CSSTransition>
                ));
        }

        return (
            <div className = { Styles.wish_list }>
                <h5 className = { Styles.title }>Ur Wish List:</h5>
                <ol>
                    <TransitionGroup>
                        { tmpMoviesInList }
                    </TransitionGroup>
                </ol>
            </div>
        );
    }
}
