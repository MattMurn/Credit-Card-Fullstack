import React from 'react';

const Jumbotron = props => {
    return (
        <div className="jumbotron">
            <h1> Welcome to Credit Card module, {props.name}</h1>
            {props.children}
        </div>
    )
}

export default Jumbotron;