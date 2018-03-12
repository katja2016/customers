import database from '../firebase/firebase';

// ADD_CUSTOMER
export const addCustomer = (customer) => {
    return {
        type: 'ADD_CUSTOMER',
        customer
    };
};

export const startAddCustomer = (customerData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = customerData;
        const customer = { description, note, amount, createdAt };

        return database.ref(`users/${uid}/customers`).push(customer).then((ref) => {
            dispatch(addCustomer({
                id: ref.key,
                ...customer
            }));
        });
    };
};

// REMOVE_CUSTOMER
export const removeCustomer = ({ id } = {}) => {
    return {
        type: 'REMOVE_CUSTOMER',
        id
    };
};

export const startRemoveCustomer = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/customers/${id}`).remove().then(() => {
           dispatch(removeCustomer({ id }));
        });
    };
};

// EDIT_CUSTOMER
export const editCustomer = (id, updates) => {
    return {
        type: 'EDIT_CUSTOMER',
        id,
        updates
    };
};

export const startEditCustomer = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/customers/${id}`).update(updates).then(() => {
            dispatch(editCustomer(id, updates));
        });
    };
};

// SET_CUSTOMERS
export const setCustomers = (customers) => ({
    type: 'SET_CUSTOMERS',
    customers
});

export const startSetCustomers = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/customers`).once('value').then((snapshot) => {
            const customers = [];
            snapshot.forEach((childSnapshot) => {
                customers.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            dispatch(setCustomers(customers));
        });
    };
};