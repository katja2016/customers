import React from 'react';
import CustomerListItem from '../../components/CustomerListItem';
import { shallow } from 'enzyme';
import expenses from '../fixtures/customers';

test('should render CustomerListItem correctly', () => {
    const wrapper = shallow(<CustomerListItem {...expenses[0]} />);
    expect(wrapper).toMatchSnapshot();
});