// Core
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { render } from 'enzyme';

// Components
import WishList from './';

Enzyme.configure({ adapter: new Adapter() });

const result = render(<WishList deleteMovieFromWishList = { () => null } />);
const wishList = [
    {
        id:           123,
        overview:     'overview',
        popularity:   12.2,
        release_date: '1998-08-20',
        title:        'title',
        vote_average: 5.2
    }
];
const moviesInList = [
    {
        id:    123,
        title: 'title'
    }
];

describe('WishList component: ', () => {
    test('WishList component should have one \'div\' element', () => {
        expect(result.find('div')).toHaveLength(1);
    });
    test('WishList component \'div\' element should have .wish_list class', () => {
        expect(result.find('div').hasClass('wish_list'));
    });
    test('WishList component should have one \'h5\' element', () => {
        expect(result.find('h5')).toHaveLength(1);
    });
    test('WishList component \'h5\' element should have .title class', () => {
        expect(result.find('h5').hasClass('title'));
    });
    test('WishList component should have one \'ol\' element', () => {
        expect(result.find('ol')).toHaveLength(1);
    });
});