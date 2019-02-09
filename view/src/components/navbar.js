import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
const Navbar = props => {
    return (
        <div className="navbar">
            {/* <Link to='/modal/new-customer'>New Customer</Link>
            <Link to='/modal/new-card' onClick={props.update_click}>New Card</Link>
            <Link to='/modal/new-transaction'>New Tansaction</Link> */}
            <button value="new_customer"onClick={props.update_click}> New Customer</button>
            <button className={props.card_btn} value="new_card" onClick={props.update_click}> New Card</button>
            <button className={props.trans_btn}value="new_transaction" onClick={props.update_click}>New transaction</button>
            
        </div>
    )
}

export default Navbar;