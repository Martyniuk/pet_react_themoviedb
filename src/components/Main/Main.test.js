// Core
import React from 'react';

// instruments
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

// components
import Main from './';

Enzyme.configure({ adapter: new Adapter() });

const result = shallow(<Main />);

describe('Main component:', () => {
    test('Should have one \'section\' element', () => {
        expect(result.find('section')).toHaveLength(1);
    });
    test('\'section\' element Should have .main class', () => {
        expect(result.find('section').hasClass('main'));
    });
    test('Should have one \'div\' element', () => {
        expect(result.find('div')).toHaveLength(1);
    });
    test('Sould have one \'SearchBar\' component', () => {
        expect(result.find('SearchBar')).toHaveLength(1);
    });
});
