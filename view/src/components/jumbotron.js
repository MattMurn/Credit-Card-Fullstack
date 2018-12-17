import React from 'react';

const Jumbotron = props => {
    return (
        <div>
            <div className="jumbotron">
                <div className="profile">
                    <img className="profile_img"src="https://via.placeholder.com/300"/>
                    <div className="profile_info">
                        <div className="profile_name">{props.name}</div>
                        <div className="profile_credit_score">{props.credit_score}</div>
                    </div>
                </div>
                <div className="card_display">
                    {props.children}
                </div>                
            </div>
        </div>

    )
}
export default Jumbotron;