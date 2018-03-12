import React from 'react';
import { CustomersSummary } from '../../components/CustomersSummary';
import { shallow } from 'enzyme';
import customers from '../fixtures/customers';

test('should render CustomersSummary without customers correctly', () => {
   const wrapper = shallow(
        <CustomersSummary
            customersCount={0}
            customersTotal={0}
        />
   );
   expect(wrapper).toMatchSnapshot();
});

test('should render CustomersSummary with one customer correctly', () => {
    const wrapper = shallow(
        <CustomersSummary
            customersCount={[customers[0].length]}
            customersTotal={customers[0].amount}
        />
    );
    expect(wrapper).toMatchSnapshot();
});

test('should render CustomersSummary with multiple customers correctly', () => {
    const wrapper = shallow(
        <CustomersSummary
            customersCount={[customers.length]}
            customersTotal={customers[0].amount + customers[1].amount + customers[2].amount}
        />
    );
    expect(wrapper).toMatchSnapshot();
});