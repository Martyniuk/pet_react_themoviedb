// Core
import React from 'react';

//instruments
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import Header from './';

Enzyme.configure({ adapter: new Adapter() });

const result = shallow(<Header />);

describe('Header component:', () => {
    test('Should have \'2 div\' elements', () => {
        expect(result.find('div')).toHaveLength(2);
    });
    test('First \'div\' element should have .header class', () => {
        expect(result.find('div').at(0).hasClass('header'));
    });
    test('Second \'div\' element should have .header_logo class', () => {
        expect(result.find('div').at(1).hasClass('header_logo'));
    });
    test('Header component should have one \'p\' element', () => {
        expect(result.find('p')).toHaveLength(1);
    });
});
