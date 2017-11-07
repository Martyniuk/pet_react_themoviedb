// Core
global.window = {};
import localStorage from 'mock-local-storage';
window.localStorage = global.localStorage;

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Components
import SearchBar from './';
import { options } from '../../containers/App';

Enzyme.configure({ adapter: new Adapter() });

const {
    apiToGetMoviesBySearch,
    apiToGetMostPopularMovies,
    apiToGetTheNewestMovies } = options;

const message = 'Hello World';

const results = [1, 2, 3];

const response = {
    status: 200,
    json:   () => ({ results })
};

window.fetch = jest.fn().mockImplementation(() => {
    return Promise.resolve(response);
});

const state = {
    textInputValue:             '',
    moviesGotBySearch:          [],
    moviesListGotByPopularity:  [],
    moviesListRecentlyReleased: [],
    dataFetching:               false
};

const mutatedStateSpinner = {
    textInputValue:             '',
    moviesGotBySearch:          [],
    moviesListGotByPopularity:  [],
    moviesListRecentlyReleased: [],
    dataFetching:               true
};

const result = shallow(<SearchBar />, {
    context: {
        apiToGetMoviesBySearch,
        apiToGetMostPopularMovies,
        apiToGetTheNewestMovies
    }
});

describe('Search Bar component: ', () => {
    test('Should have 1 \'section\' element', () => {
        expect(result.find('section')).toHaveLength(1);
    });
    test('Should have 1 \'form\' element', () => {
        expect(result.find('form')).toHaveLength(1);
    });
    test('Should have 2 \'input\' elements', () => {
        expect(result.find('input')).toHaveLength(2);
    });
    test('Should have 1 \'Content\' element', () => {
        expect(result.find('Content')).toHaveLength(1);
    });
    test('Should have \'spinner\' component on \'beforeFetching\'', () => {
        result.setState(() => ({ dataFetching: true }));
        expect(result.find('Spinner')).toHaveLength(1);
    });
    test('Function \'_getMoviesBySearch\' is a function', () => {
        expect(typeof result.instance()._getMoviesBySearch).toBe('function');
    });
    test('Function \'_getMostPopularMovies\' is a function', () => {
        expect(typeof result.instance()._getMostPopularMovies).toBe('function');
    });
    test('Function \'_getNewestMovies\' is a function', () => {
        expect(typeof result.instance()._getNewestMovies).toBe('function');
    });
    test('Fetching newest', () => {
        result.instance()._getNewestMovies();
        expect(result.state().moviesListRecentlyReleased).toEqual(results);
    });

    test('Function \'_handleTextInputChange\' is a function', () => {
        expect(typeof result.instance()._handleTextInputChange).toBe('function');
    });
    test('Function \'_handleSubmit\' is a function', () => {
        expect(typeof result.instance()._handleSubmit).toBe('function');
    });
    test('Function \'_startDataFetching\' is a function', () => {
        expect(typeof result.instance()._startDataFetching).toBe('function');
    });
    test('Function \'_startDataFetching\' should change dataFetching state to true', () => {
        result.setState(() => ({ dataFetching: true }));
        expect(result.state().dataFetching).toEqual(mutatedStateSpinner.dataFetching);
    });
    test('Function \'_stopDataFetching\' is a function', () => {
        expect(typeof result.instance()._stopDataFetching).toBe('function');
    });
    test('Function \'_stopDataFetching\' should change dataFetching state to false', () => {
        result.setState(() => ({ dataFetching: true }));
        result.instance()._stopDataFetching();
        expect(result.state().dataFetching).toEqual(state.dataFetching);
    });
    test('Function \'_handleFormToAppear\' is a function', () => {
        expect(typeof result.instance()._handleFormToAppear).toBe('function');
    });
});
