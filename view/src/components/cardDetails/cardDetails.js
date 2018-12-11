import React from 'react';

const CardDetails = props => {
    return (
        <div className="card_details" key={props.key}>
            <ul> Card: {props.card_id}</ul>
            <ul> Current Balance: ${props.balance}</ul>
            <ul> Credit Limit: ${props.limit}</ul>
            <button className="buttons" onClick={props.onClick}>
                See transactions
            </button>
        </div>
    )
}
export default CardDetails;