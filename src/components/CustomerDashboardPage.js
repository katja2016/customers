import React from 'react';
import CustomerList from './CustomerList';
import CustomerListFilters from './CustomerListFilters';
import CustomersSummary from './CustomersSummary';

const CustomerDashboardPage = () => (
    <div>
        <CustomersSummary/>
        <CustomerListFilters />
        <CustomerList />
    </div>
);

export default CustomerDashboardPage;
