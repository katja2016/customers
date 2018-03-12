import React from 'react';
import { connect } from 'react-redux';
import CustomerForm from './CustomerForm';
import { startAddCustomer } from '../actions/customers';


export class AddCustomerPage extends React.Component {
    onSubmit = (customer) => {
        this.props.startAddCustomer(customer);
        this.props.history.push('/');
    };

    render() {
        return(
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Add Customer</h1>
                    </div>
                </div>
                <div className="content-container">
                    <CustomerForm onSubmit={this.onSubmit} />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startAddCustomer: (customer) => dispatch(startAddCustomer(customer))
    };
};

export default  connect(undefined, mapDispatchToProps)(AddCustomerPage);
