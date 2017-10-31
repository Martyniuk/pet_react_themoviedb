// Core
import React, { Component } from 'react';
// Instruments
import { array, func } from 'prop-types';
import Styles from './styles.scss';
import {
    Transition,
    CSSTransition,
    TransitionGroup
} from 'react-transition-group';
// Components
import WishListItem from '../WishListItem';

export default class WishList extends Component {
    static propTypes = {
        deleteMovieFromWishList: func.isRequired,
        wishList:                array
    };

    constructor () {
        super();

        this.deleteMovieItemFromWishList = this._deleteMovieItemFromWishList;
    }

    _deleteMovieItemFromWishList (movieId) {
        const { deleteMovieFromWishList } = this.props;

        deleteMovieFromWishList(movieId);
    }

    render () {
        const { wishList } = this.props;

        const moviesInList = wishList.map(
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
                        deleteMovieItemFromWishList = { this.deleteMovieItemFromWishList }
                        id = { movie.id }
                        title = { movie.title }
                    />
                </CSSTransition>
            ));

        return (
            <div className = { Styles.wish_list }>
                <h5 className = { Styles.title }>Ur Wish List:</h5>
                <ol>
                    <TransitionGroup>
                        { moviesInList }
                    </TransitionGroup>
                </ol>
            </div>
        );
    }
}
