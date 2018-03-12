import customersReducer from '../../reducers/customers';
import customers from '../fixtures/customers';

test('should set default state', () => {
    const state = customersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('should remove customer by id', () => {
    const action = {
        type: 'REMOVE_CUSTOMER',
        id: customers[1].id
    };
    const state = customersReducer(customers, action);
    expect(state).toEqual([customers[0], customers[2]]);
});

test('should not remove customer if id not found', () => {
    const action = {
        type: 'REMOVE_CUSTOMER',
        id: -3
    };
    const state = customersReducer(customers, action);
    expect(state).toEqual([customers[0], customers[1], customers[2]]);
});

test('should add an customer', () => {
    const customer = {
        id: '4',
        description: 'Water',
        note:'',
        amount: 250,
        createdAt: 0
    };
    const action = {
        type: 'ADD_CUSTOMER',
        customer: customer
    };
    const state = customersReducer(customers, action);
    expect(state).toEqual([...customers, customer]);
});

test('should edit an customer', () => {
    const note = 'April 2017';
    const action = {
        type: 'EDIT_CUSTOMER',
        id: customers[1].id,
        updates: {
            note
        }
    };
    const state = customersReducer(customers, action);
    expect(state[1].note).toBe(note);
});

test('should not edit an customer if customer not found', () => {
    const updates = {
        note: 'Januar 2018'
    };
    const action = {
        type: 'EDIT_CUSTOMER',
        id: -40,
        updates: updates
    };
    const state = customersReducer(customers, action);
    expect(state).toEqual([customers[0], customers[1], customers[2]]);

});

test('should set customers', () => {
    const action = {
        type: 'SET_CUSTOMERS',
        customers: [customers[1]]
    };
    const state = customersReducer(customers, action);
    expect(state).toEqual([customers[1]]);
});