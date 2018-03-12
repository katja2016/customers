import React from 'react';
import { shallow } from 'enzyme';
import { CustomerList } from '../../components/CustomerList';
import customers from '../fixtures/customers';

test('should render CustomerList with customers', () => {
    const wrapper = shallow(<CustomerList customers={customers} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render CustomerList with empty message', () => {
    const wrapper = shallow(<CustomerList customers={[]} />);
    expect(wrapper).toMatchSnapshot();
});