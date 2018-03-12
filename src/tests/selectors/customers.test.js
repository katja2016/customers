import moment from 'moment';
import selectCustomers from '../../selectors/customers';
import customers from '../fixtures/customers';

test('should filter by text value', () => {
    const filters = {
        text: 'e',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const result = selectCustomers(customers, filters);
    expect(result).toEqual([customers[2], customers[1]]);
});

test('should filter by startDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    };
    const result = selectCustomers(customers, filters);
    expect(result).toEqual([customers[2], customers[0]]);
});

test('should filter by endDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0)
    };
    const result = selectCustomers(customers, filters);
    expect(result).toEqual([customers[0], customers[1]]);
});

test('should sort by date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const result = selectCustomers(customers, filters);
    expect(result).toEqual([customers[2], customers[0], customers[1]]);
});

test('should sort by amount', () => {
    const filters = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };
    const result = selectCustomers(customers, filters);
    expect(result).toEqual([customers[1], customers[2], customers[0]]);
});
