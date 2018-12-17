import React from 'react';
import '../App.css';

const modal = props => {
    return (
        <div className={props.className} onClick={props.onClick}>
            {props.children}
        </div>
    )
}
/*
            customer_id: this.customer_id,
            card_id: this.card_id,
            transaction_id: Math.random(),
            transaction_type: type,
            transaction_timestamp: date,
            post_date: date_helper.check_transaction_post_date(date),
            transaction_amount: amount,
            current_balance: this.balance,
            interest_accrued: 0,
            transaction_approved: transaction_approved
*/
const transaction = props => {
    return (
        <div className="transaction">
            <input className="modal_input" type="text" onChange={props.onChange} name="type" placeholder="type of transaction"/>
            <input className="modal_input" type="text" onChange={props.onChange} name="last_name" placeholder="Date"/>
            <input className="modal_input" type="text" onChange={props.onChange} name="amount" placeholder="amount"/>
            <button className="modal_input" onClick={props.button_click}>execute transaction</button>
        </div>
    )
};
const card = props => {
    return (
        <div className="card">
            <input className="modal_input" type="text" onChange={props.onChange} name="apr" placeholder="APR"/>
            <input className="modal_input" type="text" onChange={props.onChange} name="credit_limit" placeholder="Credit Limit"/>
            <button className="modal_input" onClick={props.button_click}>new card</button>   
        </div>
    )
}
const customer = props => {
    return (
        <div className="customer">
            <input className="modal_input" type="text" onChange={props.onChange} name="first_name" placeholder="First Name"/>
            <input className="modal_input" type="text" onChange={props.onChange} name="last_name"  placeholder="Last Name"/>
            <input className="modal_input" type="text" onChange={props.onChange} name="credit_score" placeholder="Credit Score"/>
            <button className="modal_input" onClick={props.button_click}>new customer</button>   
        </div>
    )   
}
export const Transaction = transaction;
export const Card = card;
export const Customer = customer;
export const Modal = modal;