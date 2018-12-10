import React from 'react';
import '../../App.css';

const Navbar = props => {
    return (
        <div className="navbar">
            <button onClick={props.update_click}>create new Customer</button>
            <button onClick={props.update_click}>create new card</button>
        </div>
    )
}

export default Navbar;