import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import customers from '../fixtures/customers';
import {
    startAddCustomer,
    addCustomer,
    editCustomer,
    startEditCustomer,
    removeCustomer,
    startRemoveCustomer,
    setCustomers,
    startSetCustomers
} from '../../actions/customers';
import database from '../../firebase/firebase';

const uid = '234jgjgerg';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const customersData = {};
    customers.forEach(({ id, description, note, amount, createdAt }) => {
        customersData[id] = { description, note, amount, createdAt };
    });
    database.ref(`users/${uid}/customers`).set(customersData).then(() => done());
});

test('should setup add customer action object with provided values', () => {
   const action = addCustomer(customers[2]);
   expect(action).toEqual({
       type: 'ADD_CUSTOMER',
       customer: customers[2]
   });
});

test('should add customer to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const customerData = {
        description: 'Mounse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    };

    store.dispatch(startAddCustomer(customerData)).then(() => {
        const actions = store.getActions();
        // there is only one action addCustomer in this case
        expect(actions[0]).toEqual({
            type: 'ADD_CUSTOMER',
            customer: {
                id: expect.any(String),
                ...customerData
            }
        });

        return database.ref(`users/${uid}/customers/${actions[0].customer.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(customerData);
        done();
    });
});

test('should add customer with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const defaultCustomerData = {
        description:'',
        note: '',
        amount: 0,
        createdAt: 0
    };

    store.dispatch(startAddCustomer(defaultCustomerData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_CUSTOMER',
            customer: {
                id: expect.any(String),
                ...defaultCustomerData
            }
        });

        return database.ref(`users/${uid}/customers/${actions[0].customer.id}`).once('value');

    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(defaultCustomerData);
        done();
    });
});

test('should setup edit customer action object', () => {
    const action = editCustomer('abc123', { note: 'Upgraded a package' });
    expect(action).toEqual({
        type: 'EDIT_CUSTOMER',
        id: 'abc123',
        updates: {
            note: 'Upgraded a package'
        }
    });
});

test('should edit customer from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = customers[1].id;
    const updates = {
        note: 'Rent a flat'
    };
    store.dispatch(startEditCustomer(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_CUSTOMER',
            id,
            updates
        });
        return database.ref(`users/${uid}/customers/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val().note).toBe(updates.note);
        done();
    });
});

test('should setup remove customer action object', () => {
    const action = removeCustomer({id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_CUSTOMER',
        id: '123abc'
    });
});

test('should remove customer from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = customers[2].id;
    store.dispatch(startRemoveCustomer({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_CUSTOMER',
            id
        });
        return database.ref(`users/${uid}/customers/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });
});

test('should setup set customer action object with data', () => {
    const action = setCustomers(customers);
    expect(action).toEqual({
        type: 'SET_CUSTOMERS',
        customers
    });
});

test('should fetch customers from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetCustomers()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_CUSTOMERS',
            customers
        });
        done();
    });
});