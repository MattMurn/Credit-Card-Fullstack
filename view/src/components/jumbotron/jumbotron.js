import React from 'react';

const Jumbotron = props => {
    return (
            <div className="jumbotron">
                <h1 className="welcome"> {props.name}</h1>
                <div className="card_display">
                    {props.cards}
                </div>                
            </div>
    )
}
export default Jumbotron;