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
    test('Should have two \'div\' element', () => {
        expect(result.find('div')).toHaveLength(2);
    });
    test('First \'div\' element Should have .main class', () => {
        expect(result.find('div').at(0).hasClass('main'));
    });
    test('Should have one \'SearchBar\' component', () => {
        expect(result.find('SearchBar')).toHaveLength(1);
    });
    test('Should have one \'Header\' component', () => {
        expect(result.find('Header')).toHaveLength(1);
    });
});
