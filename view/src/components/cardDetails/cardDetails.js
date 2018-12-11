import React from 'react';

const CardDetails = props => {
    return (
        <div className="card_details">
            <ul> Card: {props.card_id}</ul>
            <ul> Current Balance: ${props.balance}</ul>
            <ul> Credit Limit: ${props.limit}</ul>
            <button className="buttons" value={props.value} onClick={props.onClick}>
                See transactions
            </button>
        </div>
    )
}
export default CardDetails;