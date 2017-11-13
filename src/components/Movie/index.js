// Core
import React, { Component } from 'react';

//instruments
import PropTypes from 'prop-types';
import Styles from './styles.scss';
import image from '../../theme/assets/404.jpg';

//Components

export default class Movie extends Component {
    static propTypes = {
        checkMovieInWishList: PropTypes.func.isRequired,
        getMovieInfo:         PropTypes.func.isRequired,
        id:                   PropTypes.number.isRequired,
        overview:             PropTypes.string.isRequired,
        popularity:           PropTypes.number.isRequired,
        release_date:         PropTypes.string.isRequired,
        title:                PropTypes.string.isRequired,
        vote_average:         PropTypes.number.isRequired,
        backdrop_path:        PropTypes.string,
        poster_path:          PropTypes.string
    };

    static contextTypes = {
        apiToGetImageForMovie: PropTypes.string.isRequired
    };

    constructor () {
        super();
        this.imagePathCreation = ::this._imagePathCreation;
        this.handleGettingMovieInfo = ::this._handleGettingMovieInfo;
        this.isMovieInWishList = ::this._isMovieInWishList;
    }

    _imagePathCreation () {
        const { apiToGetImageForMovie } = this.context;

        const { poster_path } = this.props;

        const file_size = 'w300';

        if (!poster_path) {

            return image;
        }

        return `${apiToGetImageForMovie}${file_size}${poster_path}`;
    }

    _handleGettingMovieInfo (e) {
        e.preventDefault();
        const { getMovieInfo } = this.props;
        const imagePath = this.imagePathCreation();

        //const addMovie = this.addMovieToWishList;
        this.props.checkMovieInWishList(this.isMovieInWishList());
        getMovieInfo(this.props, imagePath);
    }
    _isMovieInWishList () {
        if (!localStorage.getItem('wishList')) {
            localStorage.setItem('wishList', JSON.stringify([]));
        }
        const interimList = JSON.parse(localStorage.getItem('wishList'));

        const ifMovieIsInWishList = interimList.find((item) => item.id === this.props.id);
        // how to check if movie is in wish list and move it to Parent ==> currently it is done via method

        return Boolean(ifMovieIsInWishList);
    }

    render () {
        const { title } = this.props;
        const imagePath = this.imagePathCreation();

        return (
            <section className = { Styles.movie } onClick = { this.handleGettingMovieInfo }>
                <a href = '#' >
                    <img alt = 'image' className = { Styles.img } src = { imagePath } />
                </a>
                <div className = { Styles.title }>
                    <a href = '#' >
                        <p> { title } </p>
                    </a>
                </div>
            </section>
        );
    }
}
