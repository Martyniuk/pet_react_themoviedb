// Core
import React from 'react';
import Movie from './';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { options } from '../../containers/App';

Enzyme.configure({ adapter: new Adapter() });

const { apiToGetImageForMovie } = options;
const result = shallow(<Movie
    getMovieInfo = { () => null }
    id = { 123 }
    overview = { 'ah kakaya zenwina..' }
    popularity = { 23 }
    poster_path = { '/6aUWe0GSl69wMTSWWexsorMIvwU.jpg' }
    release_date = { '2017-09-20' }
    title = { 'mne b takuiu' }
    vote_average = { 6.5 }
/>, {
    context: {
        apiToGetImageForMovie
    }
});

describe('Movie component', () => {
    test('should have 1 \'section\' element', () => {
        expect(result.find('section')).toHaveLength(1);
    });
    test ('Section element should have .movie className', () => {
        expect(result.find('section').hasClass('movie'));
    });
    test('should have 1 \'a\' element', () => {
        expect(result.find('a')).toHaveLength(2);
    });
    test('should have 1 \'img\' element', () => {
        expect(result.find('img')).toHaveLength(1);
    });
    test('Img element should have .img class', () => {
        expect(result.find('img').hasClass('img'));
    });
    test('should have 1 \'div\' element', () => {
        expect(result.find('div')).toHaveLength(1);
    });
    test('Div element should have .title className', () => {
        expect(result.find('div').hasClass('title'));
    });
    test('Function \'_imagePathCreation\' in Movie component has to be a function', () => {
        expect(typeof result.instance()._imagePathCreation).toBe('function');
    });
    test('Function \'_imagePathCreation\' in Movie component has to return a string', () => {
        expect(typeof result.instance()._imagePathCreation()).toBe(`string`);
    });
    test('Function \'_handleGettingMovieInfo\' in Movie component has to be a function', () => {
        expect(typeof result.instance()._handleGettingMovieInfo).toBe('function');
    });
});
