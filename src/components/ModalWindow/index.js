// Core
import React, { Component } from 'react';

// instrument
import PropTypes from 'prop-types';
import Styles from './styles.scss';
import image from '../../theme/assets/404.jpg';

// Components

export default class ModalWindow extends Component {
    static propTypes = {
        //addMovieToWishList: PropTypes.func.isRequired,
        closeModalWindow:  PropTypes.func.isRequired,
        id:                PropTypes.number.isRequired,
        imagePath:         PropTypes.string.isRequired,
        isMovieInWishList: PropTypes.bool.isRequired,
        movie:             PropTypes.object.isRequired,
        overview:          PropTypes.string.isRequired,
        popularity:        PropTypes.number.isRequired,
        release_date:      PropTypes.string.isRequired,
        title:             PropTypes.string.isRequired,
        vote_average:      PropTypes.number.isRequired
        //wishList:          PropTypes.array
    };

    constructor () {
        super();

        //this.handleAdditionMovieToWishList = ::this._handleAdditionMovieToWishList;
        this.handleClosingOfModalWindow = ::this._handleClosingOfModalWindow;
        //this.modalWindowTriggerCheck = ::this._modalWindowTriggerCheck;
        this.addMovieToWishList = ::this._addMovieToWishList;
    }

    /*    state = {
        modalCheckMovieInWishList: false
    };*/

    /*    componentWillMount () {
        this.modalWindowTriggerCheck();
    }
    componentDidMount () {
        this.modalWindowTriggerCheck();
    }*/
    _addMovieToWishList () {
        const { isMovieInWishList, movie } = this.props;

        if (!isMovieInWishList) {
            let wishList = JSON.parse(localStorage.getItem('wishList'));

            wishList = [movie, ...wishList];
            localStorage.setItem('wishList', JSON.stringify(wishList));

            this.forceUpdate();
            //this.setState(() => ({ isMovieInWishList: true })); /// <===
        } else {
            //this.setState(() => ({ isMovieInWishList: false }));
        }
    }
    /*    _handleAdditionMovieToWishList () {
        this.addMovieToWishList();
        this.setState(() => ({ modalCheckMovieInWishList: true }));
    }*/
    _handleClosingOfModalWindow () {
        const { closeModalWindow } = this.props;

        closeModalWindow();
    }
    /*    _modalWindowTriggerCheck () {
        const {  isMovieInWishList } = this.props;

        if (isMovieInWishList) {
            this.setState(() => ({ modalCheckMovieInWishList: true }));
        }
    }*/

    render () {
        const {
            imagePath,
            isMovieInWishList,
            overview,
            popularity,
            release_date,
            title,
            vote_average
        } = this.props;

        //const { modalCheckMovieInWishList } = this.state;

        const inWishList = isMovieInWishList
            ? <button disabled className = { Styles.included } >Included</button>
            : <button className = { Styles.add } onClick = { this.addMovieToWishList }>Watch Later</button>;

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
