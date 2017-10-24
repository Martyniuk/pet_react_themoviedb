// Core

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Content from '../Content';
import SearchBar from './';
import { options } from '../../containers/App';

Enzyme.configure({ adapter: new Adapter() });

const message = 'how you doing?';
const { apiForSearch, apiForImage } = options;
const state = {
    textInputValue: '',
    data: {
        result: []
    }
};
const mutatedState = {
    textInputValue: message,
    data: {
        result: []
    }
};

const result = shallow(<SearchBar />, {
    context: {
        apiForSearch,
        apiForImage
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
    /*test('Input text should be Empty initially', () => {

    --> find out how to check input[0].text()

        expect(result.find('input')[0].text()).toBe('');
    });*/
    /*test('Should respond to state change properly', () => {
        result.setState(() => {
            textInputValue: message
        });

        expect(result.state().toEqual(mutatedState));
        expect(result.find('input')[0].text()).toBe(message);

        result.setState(() => {
            textInputValue: ''
        });

        expect(result.state().toEqual(state));
        expect(result.find('input')[0].text()).toBe('');
    });*/
    /*test('Component state and text input value should reflect according changes if any text input provided', () => {
       result.find('input')[0].simulate('change', {
           target: {
               value: message
           }
       });
       expect(result.state()).toEqual(mutatedState);
       expect(result.find('input')[0].text()).toBe(message);
    });*/
});