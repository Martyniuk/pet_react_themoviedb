// Core
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

// Components
import WishList from './';

Enzyme.configure({ adapter: new Adapter() });

const result = shallow(<WishList deleteMovieFromWishList = { () => null } />);

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
    test('WishList component function \'_deleteMovieFromWishList\' is a function', () => {
        expect(typeof result.instance()._deleteMovieFromWishList).toBe('function');
    });
});
