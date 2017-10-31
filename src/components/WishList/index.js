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

export default class WishList extends Component {
    static propTypes = {
        wishList: array,
        deleteMovieFromWishList: func.isRequired
    };

    constructor () {
        super();

        this.handleDeletionFromWishList = this._handleDeletionFromWishList;
    }

    _handleDeletionFromWishList (e) {
        e.preventDefault();
        //const { deleteMovieFromWishList } = this.props;
        const element = e.target;
        //console.log(this.props);
        console.log(`onClock detelet item -- > ${element}`)
       
    }

    render () {
        const { wishList } = this.props;

        const moviesInList = wishList.map(
            (movie) => {
                return (
                    <CSSTransition
                    classNames = { {
                        enter:       Styles.itemInStart,
                        enterActive: Styles.itemInEnd,
                        exit:        Styles.itemOutStart,
                        exitActive:  Styles.itemOutEnd
                    } }
                    key = { movie.id }
                    timeout = { { enter: 700, exit: 600 } }>
                        <li className = { Styles.itemInList } id = { movie.id }>
                            { movie.title }
                            <span className = { Styles.delete } onClick = { this.handleDeletionFromWishList }>[x]</span>
                        </li>
                    </CSSTransition>
                );
            });

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
