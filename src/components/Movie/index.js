// Core
import React, { Component } from 'react';

//instruments
import PropTypes from 'prop-types';
import Styles from './styles.scss';
import image from '../../theme/assets/404.jpg';

//Components
import ModalWindow from '../ModalWindow';

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
        this.triggerModalWindow = ::this._triggerModalWindow;
        this.closeModalWindow = ::this._closeModalWindow;
    }

    state = {
        isModalWindowTriggered: false
    };

    _imagePathCreation () {
        const { apiToGetImageForMovie } = this.context;

        const { poster_path } = this.props;

        const file_size = 'w300';

        if (!poster_path) {
            console.log(`poster_path is missing =( ---> ${poster_path}`);

            return image;

        }

        return `${apiToGetImageForMovie}/${file_size}/${poster_path}`;
    }
    _triggerModalWindow () {
        this.setState(() => ({ isModalWindowTriggered: true }));
    }
    _closeModalWindow () {
        this.setState(() => ({ isModalWindowTriggered: false }));
    }

    render () {
        const {
            adult,
            id,
            overview,
            popularity,
            release_date,
            title,
            vote_average,
            backdrop_path,
            poster_path
        } = this.props;
        const imagePath = this.imagePathCreation();
        const { isModalWindowTriggered } = this.state;

        const modalWindowToShow = isModalWindowTriggered
            ? <ModalWindow
                adult = { adult }
                backdrop_path = { backdrop_path }
                closeModalWindow = { this.closeModalWindow }
                id = { id }
                imagePath = { imagePath }
                key = { id }
                overview = { overview }
                popularity = { popularity }
                poster_path = { poster_path }
                release_date = { release_date }
                title = { title }
                vote_average = { vote_average }
            />
            : null;

        return (
            <section className = { Styles.movie } onClick = { this.triggerModalWindow }>
                { modalWindowToShow }
                <a href = '#' >
                    <img alt = 'image' className = { Styles.img } src = { imagePath } />
                </a>
                <div>
                    <a href = '#' >
                        <p> { title } </p>
                    </a>
                </div>
            </section>
        );
    }
}
