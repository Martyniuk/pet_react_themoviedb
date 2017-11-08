// Core
import React from 'react';

// instruments
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

// components
import App from './';
import { options } from './';

Enzyme.configure({ adapter: new Adapter() });

const {
    apiToGetMoviesBySearch,
    apiToGetImageForMovie,
    apiToGetMostPopularMovies,
    apiToGetTheNewestMovies
} = options;

const result = shallow(<App />, {
    context: {
        apiToGetMoviesBySearch,
        apiToGetImageForMovie,
        apiToGetMostPopularMovies,
        apiToGetTheNewestMovies
    }
});

describe('App container:', () => {
    test('App component consist of Main component', () => {
        expect(result.find('Main')).toHaveLength(1);
    });
    test('Function \'getChildContext\' is a function', () => {
        expect(typeof result.instance().getChildContext).toBe('function');
    });
    test('Function \'getChildContext\' return is object', () => {
        expect(typeof result.instance().getChildContext()).toBe('object');
    });
    test('Function \'getChildContext\' object keys length has to be 4', () => {
        const obj = result.instance().getChildContext();

        expect(Object.keys(obj).length).toBe(4);
    });
    test('Function \'getChildContext\' object apiToGetMoviesBySearch should be appropriate', () => {
        const obj = result.instance().getChildContext();

        expect(obj.apiToGetMoviesBySearch).toBe(apiToGetMoviesBySearch);
    });
    test('Function \'getChildContext\' object apiToGetImageForMovie should be appropriate', () => {
        const obj = result.instance().getChildContext();

        expect(obj.apiToGetImageForMovie).toBe(apiToGetImageForMovie);
    });
    test('Function \'getChildContext\' object apiToGetMostPopularMovies should be appropriate', () => {
        const obj = result.instance().getChildContext();

        expect(obj.apiToGetMostPopularMovies).toBe(apiToGetMostPopularMovies);
    });
    test('Function \'getChildContext\' object apiToGetTheNewestMovies should be appropriate', () => {
        const obj = result.instance().getChildContext();

        expect(obj.apiToGetTheNewestMovies).toBe(apiToGetTheNewestMovies);
    });
});
