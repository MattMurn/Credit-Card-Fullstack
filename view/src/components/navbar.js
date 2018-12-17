import React from 'react';
import '../App.css';

const Navbar = props => {
    return (
        <div className="navbar">
            <button value="new_customer"onClick={props.update_click}> New Customer</button>
            <button className={props.card_btn} value="new_card" onClick={props.update_click}> New Card</button>
            <button className={props.trans_btn}value="new_transaction" onClick={props.update_click}>New transaction</button>
            {/* <h1 className="welcome">Welcome to the Credit Card simulator</h1>    */}
        </div>
    )
}

export default Navbar;