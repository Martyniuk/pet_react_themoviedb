// Core
import React, { Component } from 'react';

//instruments
import PropTypes from 'prop-types';
import Styles from './styles.scss';

//Components
import WishList from '../WishList';

export default class Movie extends Component {
    static propTypes = {
        adult:         PropTypes.bool.isRequired,
        id:            PropTypes.number.isRequired,
        overview:      PropTypes.string.isRequired,
        popularity:    PropTypes.number.isRequired,
        release_date:  PropTypes.string.isRequired,
        title:         PropTypes.string.isRequired,
        vote_average:  PropTypes.number.isRequired,
        backdrop_path: PropTypes.string,
        poster_path:   PropTypes.string
    };
    static defaultProps = {
        wishListTrigger: false
    };
    static contextTypes = {
        apiToGetImageForMovie: PropTypes.string.isRequired
    };

    constructor () {
        super();
        this.imagePathCreation = ::this._imagePathCreation;
        this.handleDeletionFromWishList = ::this._handleDeletionFromWishList;
        this.handleAdditionToWishList = ::this._handleAdditionToWishList;
    }

    state = {
        includedToWishList: false
    };

    _imagePathCreation () {
        const { apiToGetImageForMovie } = this.context;

        let { poster_path } = this.props;

        const file_size = 'w500';

        if (!poster_path) {
            poster_path = '';
            console.log(`poster_path is missing ---> ${poster_path}`);
        }

        return `${apiToGetImageForMovie}/${file_size}/${poster_path}`;
    }

    _handleDeletionFromWishList () {
        this.setState(() => ({ includedToWishList: false }));
    }

    _handleAdditionToWishList () {
        this.setState(() => ({ includedToWishList: true }));
    }

    render () {
        const { title } = this.props;

        //const { includedToWishList } = this.state;

        const imagePath = this.imagePathCreation();

        /*const inWishList = includedToWishList
            ? <span className = { Styles.inWishList } onClick = { this.handleDeletionFromWishList } />
            : <span className = { Styles.notInWishList } onClick = { this.handleAdditionToWishList } />;*/

        return (
            <section className = { Styles.movie }>
                <a href = '#' >
                    <img alt = 'image' className = { Styles.img } src = { imagePath } />
                </a>
                <div>

                    {/*{ inWishList }*/}
                    <a href = '#' >
                        <p> { title } </p>
                    </a>
                </div>

            </section>
        );
    }
}
