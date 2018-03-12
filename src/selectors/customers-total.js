export default (customers) => {
    return customers
        .map((expense) => expense.amount)
        .reduce((accumulator, currValue) => accumulator + currValue, 0);
};
