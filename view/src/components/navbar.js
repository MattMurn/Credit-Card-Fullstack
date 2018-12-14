import React from 'react';
import '../App.css';

const Navbar = props => {
    return (
        <div className="navbar">
            <button value="new_customer"onClick={props.update_click}>create new Customer</button>
            <button className={props.card_btn} value="new_card" onClick={props.update_click}>create new card</button>
            <button className={props.trans_btn}value="new_transaction" onClick={props.update_click}>new transaction</button>
        </div>
    )
}

export default Navbar;