import React from 'react';
import { shallow } from 'enzyme';
import CustomerDashboardPage from '../../components/CustomerDashboardPage';

test('should render CustomerDashboardPage correctly', () => {
    const wrapper = shallow(<CustomerDashboardPage/>);
    expect(wrapper).toMatchSnapshot();
});