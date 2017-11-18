// Core
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';

// Components
import ModalWindow from './';

Enzyme.configure({ adapter: new Adapter() });

const state = {
    modalWindowCheckIfMovieIsAddedToWishList: false
};

const mutatedState = {
    modalWindowCheckIfMovieIsAddedToWishList: true
};

const result = mount(
    <ModalWindow
        isMovieIncludedToWishList
        addMovieToWishList = { () => null }
        closeModalWindow = { () => null }
        id = { 123 }
        imagePath = { 'path' }
        overview = { 'overview' }
        popularity = { 12 }
        release_date = { '2015-06-17' }
        title = { 'title' }
        vote_average = { 12 }
    />
);

describe('ModalWindow component:', () => {
    test('Should have 3 \'div\' elements', () => {
        expect(result.find('div')).toHaveLength(3);
    });
    test('Should have one span element', () => {
        expect(result.find('span')).toHaveLength(1);
    });
    test('Span element should have .cross class', () => {
        expect(result.find('span').hasClass('cross'));
    });
    test('Should have 5 \'p\' elements', () => {
        expect(result.find('p')).toHaveLength(5);
    });
    test('should have 1 \'img\' element', () => {
        expect(result.find('img')).toHaveLength(1);
    });
    test('should have 1 \'button\' element', () => {
        expect(result.find('button')).toHaveLength(1);
    });
    test('Button should have \'included\'  class in case state is true', () => {
        result.setState(() => ({
            modalCheckMovieInWishList: true
        }));
        expect(result.find('button').hasClass('included'));
        expect(result.state()).toEqual(mutatedState);
    });
    test('Button should have \'add\'  class in case state is false', () => {
        result.setState(() => ({
            modalCheckMovieInWishList: false
        }));
        expect(result.find('button').hasClass('add'));
        expect(result.state()).toEqual(state);
    });
    test('Function \'_handleAdditionMovieToWishList\' is a function', () => {
        expect(typeof result.instance()._handleAdditionMovieToWishList).toBe('function');
    });
    test('Function \'_handleClosingOfModalWindow\' is a function', () => {
        expect(typeof result.instance()._handleClosingOfModalWindow).toBe('function');
    });
    test('Function \'_modalWindowTriggerCheck\' is a function', () => {
        expect(typeof result.instance()._modalWindowTriggerCheck).toBe('function');
    });
});
