// Core
import React from 'react';
import Movie from './';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { options } from '../../containers/App';

Enzyme.configure({ adapter: new Adapter() });

const { apiToGetImageForMovie } = options;
const key = '3e9c711ebc7c13d5b3078979c12ee0ca';
const result = shallow(<Movie 
        getMovieInfo = { () => null }
        id = { 123 }
        overview = { 'ah kakaya zenwina..' }
        popularity = { 23 }
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
    })
    test('should have 1 \'a\' element', () => {
        expect(result.find('a')).toHaveLength(1);
    });
    test('should have 1 \'div\' element', () => {
        expect(result.find('div')).toHaveLength(1);
    });
    test('Div element should have .title className', () => {
        expect(result.find('div').hasClass('title'));
    })

});
