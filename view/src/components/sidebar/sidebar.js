import React from 'react';
import '../../App.css'
const Sidebar = props => {
    return (

        <div className="sidebar">
            <h1> Users</h1>
            {props.children}
        </div>

    )
}

export default Sidebar;