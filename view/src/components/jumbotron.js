import React from 'react';

const Jumbotron = props => {
    return (
        <div>
            <div className={props.className}>
                <div className="profile">
                    <img className="profile_img"src="https://northmemorial.com/wp-content/uploads/2016/10/PersonPlaceholder-300x300.png"/>
                    <div className="profile_info">
                        <div className="profile_name">{props.name}</div>
                        <div className="profile_credit_score"> Your current credit score is: {props.credit_score}</div>
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