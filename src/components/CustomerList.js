import React from 'react';
import { connect } from 'react-redux';
import CustomerListItem from './CustomerListItem';
import selectCustomers from '../selectors/customers';

export const CustomerList = (props) => (
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Customers</div>
            <div className="show-for-desktop">Customer</div>
            <div className="show-for-desktop">Amount</div>
        </div>
        <div className="list-body">
            {props.customers.length === 0 ? (
                <div>
                    <span className="list-item list-item--message">No customers</span>
                </div>
            ) : (
                props.customers.map((customer) => {
                    return <CustomerListItem {...customer} key={customer.id}/>;
                }))}
        </div>
    </div>
);

const mapStateToProps = (state) => {
    return {
        customers: selectCustomers(state.customers, state.filters),
    };
};

export default connect(mapStateToProps)(CustomerList);
