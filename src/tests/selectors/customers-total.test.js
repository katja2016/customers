import getCustomersTotal from '../../selectors/customers-total';
import customers from '../fixtures/customers';

test('should return 0 if no customers', () => {
    const result = getCustomersTotal([]);
    expect(result).toBe(0);
});

test('should correctly add up a single customer', () => {
    const result = getCustomersTotal([customers[0]]);
    expect(result).toBe(customers[0].amount);
});

test('should correctly add up multiple customers', () => {
    const result = getCustomersTotal(customers);
    expect(result).toBe(customers[0].amount + customers[1].amount + customers[2].amount);
});


