// Core
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

// components
import WishListItem from './';

Enzyme.configure({ adapter: new Adapter() });

const result = shallow(
    <WishListItem
        deleteMovieFromWishList = { () => null }
        id = { 123 }
        title = { `title` }
    />);

describe('WishListItem component', () => {
    test('Should have one li element', () => {
        expect(result.find('li')).toHaveLength(1);
    });
    test('Should have one span element', () => {
        expect(result.find('span')).toHaveLength(1);
    });
    test('Span element should have .delete class', () => {
        expect(result.find('li').hasClass('delete'));
    });
    test('WishListItem component function \'_handleDeleteFromWishList\' is a function', () => {
        expect(typeof result.instance()._handleDeleteFromWishList).toBe('function');
    });
    test('Result elements of type \'Li\' should have 2 children', () => {
        expect(result.find('li').children().length).toBe(2);
    });
});
