// Core
import React, { Component } from 'react';

// Instruments
import { array } from 'prop-types';
import Styles from './styles.scss';

// Components
import Movie from '../Movie';
import ModalWindow from '../ModalWindow';
import WishList from '../WishList';


export default class Content extends Component {
    static propTypes = {
        latestMoviesList:      array.isRequired,
        mostPopularMoviesList: array.isRequired,
        moviesListGotBySearch: array
    };
    static defaultProps = {
        moviesListGotBySearch: [],
        mostPopularMoviesList: [],
        latestMoviesList:      []
    };

    constructor () {
        super();

        this.triggerModalWindow = ::this._triggerModalWindow;
        this.closeModalWindow = ::this._closeModalWindow;
        this.getMovieInfo = ::this._getMovieInfo;
        this.addMovieToWishList = ::this._addMovieToWishList;
        this.isMovieInWishList = ::this._isMovieInWishList;
    }

    state = {
        isModalWindowTriggered:    false,
        movieInModalWindow:        {},
        imagePath:                 '',
        wishListTrigger:           false,
        wishList:                  [],
        isMovieIncludedToWishList: false
    };

    _getMovieInfo (movieComponent, imagePath) {
        //const { movieInModalWindow } = this.state;

        this.setState(() => ({
            movieInModalWindow: movieComponent,
            imagePath
        }));
        // можно ли завершить setState до того как начнет выполняться triggerModalWindow...

        // this.isMovieInWishList();
        this.triggerModalWindow(movieComponent);
    }

    _triggerModalWindow (mComponent) {
        console.log(`4. =====> _getMovieInfo from Content after setState before triggerModalWindow with movieComponent --> ${JSON.stringify(this.state.movieInModalWindow)} and \n movieInModalWindow is ${JSON.stringify(this.state.movieInModalWindow)}`);
        this.isMovieInWishList(mComponent);
        console.log(``);
        this.setState(() => ({ isModalWindowTriggered: true }));
    }

    _closeModalWindow () {
        this.setState(() => ({ isModalWindowTriggered: false }));
    }

    _addMovieToWishList (movie) {
        const {
            wishList,
            isMovieIncludedToWishList,
            movieInModalWindow } = this.state;

        console.log(`_addMovieToWishList === movieInModalWindow -> ${JSON.stringify(movieInModalWindow)}, movie got from Movie by this.props-> ${JSON.stringify(movie)}`);

        this.isMovieInWishList(movie);

        if (!isMovieIncludedToWishList) {
            this.setState(() => {
                wishList.push(movie);

                return wishList;
            });
        }

        localStorage.setItem('wishList', JSON.stringify(this.state.wishList));
    }

    _isMovieInWishList (mComponent) {
        const { wishList } = this.state;

        if (!wishList) {
            //console.log(`as soon as Modal is Ticked "movieInModalWindow" cannot be null...
            //something is wrong in this method...`);

            throw new Error(`Wish List is empty`);
        }

        const wishListIds = wishList.map((item) => item.id);

        const checkIfMovieIdIsInWishList = wishListIds.indexOf(mComponent.id) >= 0;

        /*
                console.log(`_isMovieInWishList method ==> before wishList ---> ${wishList}`);
                console.log(`_isMovieInWishList method ==> before wishListIds ---> ${wishListIds}`);
        */

        //console.log(`_isMovieInWishList method ==> before isMovieIncludedToWishList ---> ${this.state.isMovieIncludedToWishList}`);
        //console.log(`_isMovieInWishList method ==> before checkIfMovieIdIsInWishList ---> ${checkIfMovieIdIsInWishList}`);

        this.setState(() => ({
            isMovieIncludedToWishList: checkIfMovieIdIsInWishList
        }));
        //console.log(`_isMovieInWishList method ==> after movieInModalWindow ==--> ${JSON.stringify(movieInModalWindow)}`);
        //console.log(`_isMovieInWishList method ==> after isMovieIncludedToWishList ---> ${this.state.isMovieIncludedToWishList}`);
        //console.log(`_isMovieInWishList method ==> after checkIfMovieIdIsInWishList ---> ${checkIfMovieIdIsInWishList}`);
    }

    render () {
        const {
            isModalWindowTriggered,
            movieInModalWindow,
            imagePath,
            wishList,
            isMovieIncludedToWishList
        } = this.state;

        const modalWindowToShow = isModalWindowTriggered
            ? (
                <ModalWindow
                    addMovieToWishList = { this.addMovieToWishList }
                    closeModalWindow = { this.closeModalWindow }
                    id = { movieInModalWindow.id }
                    imagePath = { imagePath }
                    isMovieIncludedToWishList = { isMovieIncludedToWishList }
                    overview = { movieInModalWindow.overview }
                    popularity = { movieInModalWindow.popularity }
                    release_date = { movieInModalWindow.release_date }
                    title = { movieInModalWindow.title }
                    vote_average = { movieInModalWindow.vote_average }
                />
            )
            : null;
        const {
            moviesListGotBySearch,
            mostPopularMoviesList,
            latestMoviesList
        } = this.props;

        const wishListTrigger = wishList.length !== 0
            ? <WishList
                wishList = { wishList }
            />
            : null;

        const moviesListGotBySearchToRender = moviesListGotBySearch.map(
            ({
                id,
                vote_average,
                title,
                popularity,
                poster_path,
                backdrop_path,
                adult,
                overview,
                release_date
            }) => (
                <Movie
                    adult = { adult }
                    backdrop_path = { backdrop_path }
                    getMovieInfo = { this.getMovieInfo }
                    id = { id }
                    key = { id }
                    overview = { overview }
                    popularity = { popularity }
                    poster_path = { poster_path }
                    release_date = { release_date }
                    title = { title }
                    vote_average = { vote_average }
                />
            )
        );

        const advert = moviesListGotBySearch.length === 0
            ? <h3 className = { Styles.title } >Oi, Your Advert can be Here!!</h3>
            : <div className = { Styles.content }>
                <h3 className = { Styles.title }>Content of Movies</h3>
                <span className = { Styles.content_list }>{ moviesListGotBySearchToRender }</span>
            </div>;

        //console.log(`render in Content -- > movies got by search --> ${moviesListGotBySearch}`);

        const popularMoviesListToRender = mostPopularMoviesList.map(
            ({
                id,
                vote_average,
                title,
                popularity,
                poster_path,
                backdrop_path,
                adult,
                overview,
                release_date
            }) => (

                /*CCSTransition*/
                <Movie
                    adult = { adult }
                    backdrop_path = { backdrop_path }
                    getMovieInfo = { this.getMovieInfo }
                    id = { id }
                    key = { id }
                    overview = { overview }
                    popularity = { popularity }
                    poster_path = { poster_path }
                    release_date = { release_date }
                    title = { title }
                    vote_average = { vote_average }
                />

                /*CCSTransition*/
            ));

        const latestMoviesListToRender = latestMoviesList.map(
            ({
                id,
                vote_average,
                title,
                popularity,
                poster_path,
                backdrop_path,
                adult,
                overview,
                release_date
            }) => (

                /*CCSTransition*/
                <Movie
                    adult = { adult }
                    backdrop_path = { backdrop_path }
                    getMovieInfo = { this.getMovieInfo }
                    id = { id }
                    key = { id }
                    overview = { overview }
                    popularity = { popularity }
                    poster_path = { poster_path }
                    release_date = { release_date }
                    title = { title }
                    vote_average = { vote_average }
                />

                /*CCSTransition*/
            ));

        return (
            <section className = { Styles.content } >
                { modalWindowToShow }
                { wishListTrigger }
                { advert }
                <h4 className = { Styles.title }>The Most Popular</h4>
                <div className = { Styles.content_list }>
                    { popularMoviesListToRender }
                </div>
                <h5 className = { Styles.title }>Latest Arrived</h5>
                <div className = { Styles.content_list }>
                    { latestMoviesListToRender }
                </div>
            </section>
        );
    }
}
