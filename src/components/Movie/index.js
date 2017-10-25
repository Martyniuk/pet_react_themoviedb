// Core
import React, { Component } from 'react';

//instruments
import PropTypes from 'prop-types';
import Styles from './styles.scss';

//Components
import WishList from '../WishList';

export default class Movie extends Component {
    static propTypes = {
        adult: PropTypes.bool.isRequired,
        id: PropTypes.number.isRequired,
        vote_average: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        popularity: PropTypes.number.isRequired,
        poster_path: PropTypes.string,
        backdrop_path: PropTypes.string,
        overview: PropTypes.string.isRequired,
        release_date: PropTypes.string.isRequired
    };
    static defaultProps = {
        wishListTrigger: false
    };
    static contextTypes = {
        apiForImage: PropTypes.string.isRequired
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
        const { apiForImage } = this.context;
        let { poster_path } = this.props;
        const file_size = 'w500';
        if (!poster_path) {
            poster_path = '';
            console.log(`poster_path is missing ---> ${ poster_path }`);
        }
        return `${apiForImage}/${file_size}/${poster_path}`;
    }

    _handleDeletionFromWishList () {
        this.setState(() => ({ includedToWishList: false }));
    }

    _handleAdditionToWishList () {
        this.setState(() => ({ includedToWishList: true }));
    }

    render () {
        const { title } = this.props;

        const { includedToWishList } = this.state;

        const imagePath = this.imagePathCreation();

        /*const inWishList = includedToWishList
            ? <span className = { Styles.inWishList } onClick = { this.handleDeletionFromWishList } />
            : <span className = { Styles.notInWishList } onClick = { this.handleAdditionToWishList } />;*/

        return (
            <section className = { Styles.movie }>
                <a href = '#' >
                    <img alt = 'image' src = { imagePath } />
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
