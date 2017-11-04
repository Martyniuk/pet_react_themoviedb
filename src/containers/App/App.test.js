// Core
import React from 'react';

// instruments
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

// components
import App from './';

Enzyme.configure({ adapter: new Adapter() });

const result = shallow(<App />);

describe('App container:', () => {
    test('Should have one \'section\' element', () => {
        expect(result.find('section')).toHaveLength(1);
    });
    test('\'section\' element Should have .app class', () => {
        expect(result.find('section').hasClass('app'));
    });
    test('Sould have one \'Catcher\' component', () => {
        expect(result.find('Catcher')).toHaveLength(1);
    });
    test('Sould have one \'Catcher\' component', () => {
        expect(result.find('Main')).toHaveLength(1);
    });
    test('Function \'getChildContext\' is a function', () => {
        expect(typeof result.instance().getChildContext).toBe('function');
    });
    test('Function \'getChildContext\' return is object', () => {
        expect(typeof result.instance().getChildContext()).toBe('object');
    });
});
