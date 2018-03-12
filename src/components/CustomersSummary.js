import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectCustomers from '../selectors/customers';
import selectCustomersTotal from '../selectors/customers-total';
import numeral from 'numeral';

export const CustomersSummary = ({ customersCount, customersTotal }) => {
    const customerWord = customersCount === 1 ? 'customer' : 'customers';
    const formattedCustomersTotal = numeral(customersTotal).format('$0,0.00');

    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Viewing <span>{customersCount}</span> {customerWord} spending <span>{formattedCustomersTotal}</span></h1>
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add customer</Link>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const visibleCustomers = selectCustomers(state.customers, state.filters);
    return {
        customersCount: visibleCustomers.length,
        customersTotal: selectCustomersTotal(visibleCustomers)
    };
};

// connect to redux store
export default connect(mapStateToProps)(CustomersSummary);
