import React from 'react';
import '../App.css';
const Sidebar = props => {
    return (

        <div className="sidebar" onClick={props.onClick}>
            <h1> Users</h1>
            {props.children}
        </div>

    )
}

export default Sidebar;