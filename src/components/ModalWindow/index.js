// Core
import React, { Component } from 'react';

// instrument
import PropTypes from 'prop-types';
import Styles from './styles.scss';
import image from '../../theme/assets/404.jpg';

// Components
import WishList from '../WishList';

export default class ModalWindow extends Component {
    static propTypes = {
        addMovieToWishList:   PropTypes.func.isRequired,
        closeModalWindow:     PropTypes.func.isRequired,
        id:                   PropTypes.number.isRequired,
        imagePath:            PropTypes.string.isRequired,
        isIncludedToWishList: PropTypes.bool.isRequired,
        overview:             PropTypes.string.isRequired,
        popularity:           PropTypes.number.isRequired,
        release_date:         PropTypes.string.isRequired,
        title:                PropTypes.string.isRequired,
        vote_average:         PropTypes.number.isRequired,
        wishList:             PropTypes.array
    };

    constructor () {
        super();
        this.handleAdditionMovieToWishList = ::this._handleAdditionMovieToWishList;
        this.handleClosingOfModalWindow = ::this._handleClosingOfModalWindow;
    }

    state = {
        isIncludedToWishList: false
    }

    _handleAdditionMovieToWishList () {
        const { addMovieToWishList } = this.props;

        this.setState(() => ({ includedToWishList: true }));

        addMovieToWishList(this.props);
    }

    _handleClosingOfModalWindow () {

        const { closeModalWindow } = this.props;

        closeModalWindow();
    }

    render () {
        const {
            id,
            imagePath,
            overview,
            popularity,
            release_date,
            title,
            vote_average,
            wishList,
            isIncludedToWishList
        } = this.props;

        const inWishList = isIncludedToWishList
            ? <button disabled className = { Styles.included } >Included</button>
            : <button className = { Styles.add } onClick = { this.handleAdditionMovieToWishList }>Watch Later</button>

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
