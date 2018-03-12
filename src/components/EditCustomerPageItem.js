import React from 'react';
import { connect } from 'react-redux';
import CustomerForm from './CustomerForm';
import { startEditCustomer, startRemoveCustomer } from '../actions/customers';

export class EditCustomerPageItem extends React.Component {

    onSubmit = (customer) => {
        this.props.startEditCustomer(this.props.customer.id, customer);
        this.props.history.push('/');
    };

    onRemove = () => {
        this.props.startRemoveCustomer({ id: this.props.customer.id });
        this.props.history.push('/');
    };

    render(){
        return(
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Customer</h1>
                    </div>
                </div>
                <div className="content-container">
                    <CustomerForm
                        customer={this.props.customer}
                        onSubmit={this.onSubmit}
                    />
                    <button className="button button--secondary" onClick={this.onRemove}>Remove Customer</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        customer: state.customers.find((espense) => {
            return espense.id === props.match.params.id;
        })
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startEditCustomer: (id, customer) => dispatch(startEditCustomer(id, customer)),
        startRemoveCustomer: (data) => dispatch(startRemoveCustomer(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCustomerPageItem);