import React from 'react';
import '../../App.css'

const Model = props => {
    return (
        // <div id="outer_id" onClick={props.model_close}>
        <div className={props.class_}>
            <input type="text" value={props.first_name} placeholder="First Name"/>
            <input type="text" value={props.last_name} placeholder="Last Name"/>
            <input type="text" value={props.credit_score} placeholder="Credit Score"/>
            <button onClick={props.button_click}>Create new {props.create_type}</button>
        </div>
        // </div>
    )
}
export default Model;