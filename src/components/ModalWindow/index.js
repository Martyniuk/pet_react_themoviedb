// Core
import React, { Component } from 'react';

// instrument
import PropTypes from 'prop-types';
import Styles from './styles.scss';
import image from '../../theme/assets/404.jpg';

// Components
import Movie from '../Movie';

export default class ModalWindow extends Component {
    static propTypes = {
        closeModalWindow: PropTypes.func.isRequired,
        id:               PropTypes.number.isRequired,
        imagePath:        PropTypes.string.isRequired,
        overview:         PropTypes.string.isRequired,
        popularity:       PropTypes.number.isRequired,
        release_date:     PropTypes.string.isRequired,
        title:            PropTypes.string.isRequired,
        vote_average:     PropTypes.number.isRequired
    };

    constructor () {
        super();
        this.handleDeletionFromWishList = ::this._handleDeletionFromWishList;
        this.handleAdditionToWishList = ::this._handleAdditionToWishList;
        this.handleClosingOfModalWindow = ::this._handleClosingOfModalWindow;
    }

    state = {
        includedToWishList: false
    };

    _handleDeletionFromWishList () {
        this.setState(() => ({ includedToWishList: false }));
    }

    _handleAdditionToWishList () {
        this.setState(() => ({ includedToWishList: true }));
    }

    _handleClosingOfModalWindow () {

        const { closeModalWindow } = this.props;

        closeModalWindow();
    }

    render () {
        const {
            adult,
            id,
            imagePath,
            overview,
            popularity,
            release_date,
            title,
            vote_average
        } = this.props;
        //const { includedToWishList } = this.state;

        /*const inWishList = includedToWishList
            ? <span className = { Styles.inWishList } onClick = { this.handleDeletionFromWishList } />
            : <span className = { Styles.notInWishList } onClick = { this.handleAdditionToWishList } />;*/

        return (
            <div className = { Styles.modal }>
                <div className = { Styles.modal_content }>
                    <span className = { Styles.cross } onClick = { this.handleClosingOfModalWindow } />
                    <h4>{ title }</h4>
                    <img alt = { image } src = { imagePath } />
                    <p>Overview: { overview } </p>
                    <p>Popularity: { popularity } </p>
                    <p>Release date: { release_date } </p>
                    <p>Votes average: { vote_average } </p>
                </div>
            </div>
        );
    }
}
