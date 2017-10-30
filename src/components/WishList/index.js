// Core
import React, { Component } from 'react';
// Instruments
import { array } from 'prop-types';
import Styles from './styles.scss';
import {
    Transition,
    CSSTransition,
    TransitionGroup
} from 'react-transition-group';
// Components

export default class WishList extends Component {
    static propTypes = {
        wishList: array
    };

    //constructor
    //create input button for deletion a movie from WishList
    //use Transition in order to implement animation

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
                        <li className = { Styles.itemInList }>
                            {movie.title}
                            <span className = { Styles.delete } />
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
