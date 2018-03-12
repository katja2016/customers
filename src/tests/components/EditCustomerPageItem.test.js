import React from 'react';
import { shallow } from 'enzyme';
import customers from '../fixtures/customers';
import { EditCustomerPageItem } from '../../components/EditCustomerPageItem';

let startEditCustomer, startRemoveCustomer, history, wrapper;

beforeEach(() => {
    startEditCustomer = jest.fn();
    startRemoveCustomer = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(
        <EditCustomerPageItem
            startEditCustomer={startEditCustomer}
            startRemoveCustomer={startRemoveCustomer}
            history={history}
            customer={customers[2]}
        />
    );
});

test('should render EditCustomerPageItem correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle startEditCustomer', () => {
    wrapper.find('CustomerForm').prop('onSubmit')(customers[2]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startEditCustomer).toHaveBeenLastCalledWith(customers[2].id, customers[2]);
});

test('should handle startRemoveCustomer', () => {
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startRemoveCustomer).toHaveBeenLastCalledWith({ id: customers[2].id });
});