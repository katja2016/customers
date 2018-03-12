import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class CustomerForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            description: props.customer ? props.customer.description : '',
            note: props.customer ? props.customer.note : '',
            amount: props.customer ? (props.customer.amount).toString() : '',
            createdAt: props.customer ? moment(props.customer.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        };
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };

    onAmountChange = (e) => {
        const amount = e.target.value;
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/g)){
            this.setState(() => ({ amount }));
        }
    };

    onDateChange = (createdAt) => {
        if(createdAt){
            this.setState(() => ({ createdAt }));
        }
    };

    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };

    onSubmit = (e) => {
        e.preventDefault();

        if(!this.state.description || !this.state.amount){
            this.setState(() => ({ error: 'Enter valid data for description and amount fields.' }));
        }else{
            this.setState(() => ({ error: '' }));
            
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10),
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            })
        }
    };

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <div className="form__error">{this.state.error}</div>}
                <input
                    type="text"
                    placeholder="Description"
                    autoFocus
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                    className="text-input"
                />
                <input
                    type="text"
                    placeholder="Amount"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                    className="text-input"
                />
                <SingleDatePicker
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
                <textarea
                    placeholder="Add a note about your customer"
                    value={this.state.note}
                    onChange={this.onNoteChange}
                    className="textarea"
                ></textarea>
                <div>
                    <button className="button">Save</button>
                </div>
            </form>
        );
    };
}