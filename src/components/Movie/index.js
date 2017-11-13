// Core
import React, { Component } from 'react';

//instruments
import PropTypes from 'prop-types';
import Styles from './styles.scss';
import image from '../../theme/assets/404.jpg';

//Components

export default class Movie extends Component {
    static propTypes = {
        getMovieInfo:  PropTypes.func.isRequired,
        id:            PropTypes.number.isRequired,
        overview:      PropTypes.string.isRequired,
        popularity:    PropTypes.number.isRequired,
        release_date:  PropTypes.string.isRequired,
        title:         PropTypes.string.isRequired,
        vote_average:  PropTypes.number.isRequired,
        backdrop_path: PropTypes.string,
        poster_path:   PropTypes.string
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
    state = {
        inWishList: false
    };
    _imagePathCreation () {
        const { apiToGetImageForMovie } = this.context;

        const { poster_path } = this.props;

        const file_size = 'w300';

        if (!poster_path) {

            return image;
        }

        return `${apiToGetImageForMovie}${file_size}${poster_path}`;
    }

    async _handleGettingMovieInfo (e) {
        e.preventDefault();
        await this.isMovieInWishList();
        const { inWishList } = await this.state;
        const { getMovieInfo } = this.props;
        const imagePath = this.imagePathCreation();

        await getMovieInfo(this.props, imagePath, inWishList);
    }
    _isMovieInWishList () {
        if (!localStorage.getItem('wishList')) {
            localStorage.setItem('wishList', JSON.stringify([]));
        }
        const interimList = JSON.parse(localStorage.getItem('wishList'));
        const ifMovieIsInWishList = interimList.find((item) => item.id === this.props.id);

        if (ifMovieIsInWishList) {
            this.setState(() => ({ inWishList: true }));
        } else {
            this.setState(() => ({ inWishList: false }));
        }
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
