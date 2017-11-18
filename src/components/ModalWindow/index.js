// Core
import React, { Component } from 'react';

// instrument
import { func, number, string, bool } from 'prop-types';
import Styles from './styles.scss';
import image from '../../theme/assets/404.jpg';

export default class ModalWindow extends Component {
    static propTypes = {
        closeModalWindow:  func.isRequired,
        id:                number.isRequired,
        imagePath:         string.isRequired,
        isMovieInWishList: bool.isRequired,
        overview:          string.isRequired,
        popularity:        number.isRequired,
        release_date:      string.isRequired,
        title:             string.isRequired,
        vote_average:      number.isRequired
    };

    constructor () {
        super();
        this.handleClosingOfModalWindow = ::this._handleClosingOfModalWindow;
        this.handleAdditionMovieToWishList = ::this._handleAdditionMovieToWishList;
        this.addMovieToWishList = ::this._addMovieToWishList;
        this.modalWindowTriggerCheck = ::this._modalWindowTriggerCheck;
    }

    state = {
        modalCheckMovieInWishList: false
    };
    componentWillMount () {
        this.modalWindowTriggerCheck();
    }
    componentDidMount () {
        this.modalWindowTriggerCheck();
    }
    _addMovieToWishList () {
        const { id, title } = this.props;
        const { modalCheckMovieInWishList } = this.state;
        const movieObject = {
            id,
            title
        };

        if (!modalCheckMovieInWishList) {
            let wishList = JSON.parse(localStorage.getItem('wishList'));

            wishList = [movieObject, ...wishList];
            localStorage.setItem('wishList', JSON.stringify(wishList));
            this.setState(() => ({ modalCheckMovieInWishList: true }));
        } else {
            this.setState(() => ({ modalCheckMovieInWishList: false }));
        }
    }

    _handleAdditionMovieToWishList () {
        this.addMovieToWishList();
        this.setState(() => ({ modalCheckMovieInWishList: true }));
    }
    _handleClosingOfModalWindow () {
        const { closeModalWindow } = this.props;

        closeModalWindow();
    }

    _modalWindowTriggerCheck () {
        const { isMovieInWishList } = this.props;

        if (isMovieInWishList) {
            this.setState(() => ({ modalCheckMovieInWishList: true }));
        } else {
            this.setState(() => ({ modalCheckMovieInWishList: false }));
        }
    }
    render () {
        const {
            imagePath,
            overview,
            popularity,
            release_date,
            title,
            vote_average
        } = this.props;
        const { modalCheckMovieInWishList } = this.state;

        const inWishList = modalCheckMovieInWishList
            ? <button disabled className = { Styles.included } >Included</button>
            : <button className = { Styles.add } onClick = { this.handleAdditionMovieToWishList }>Watch Later</button>;

        return (
            <div className = { Styles.modal }>
                <div className = { Styles.modal_content }>
                    { inWishList }
                    <span className = { Styles.cross } onClick = { this.handleClosingOfModalWindow } />
                    <p className = { Styles.modal_title }>{ title }</p>
                    <img alt = { image } src = { imagePath } />
                    <div className = { Styles.modal_description }>
                        <p><b>Overview:</b> { overview } </p>
                        <p><b>Popularity:</b> { popularity.toFixed(2) } </p>
                        <p><b>Release date:</b> { release_date } </p>
                        <p><b>Votes average:</b> { vote_average } </p>
                    </div>
                </div>
            </div>
        );
    }
}
