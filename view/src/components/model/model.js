import React from 'react';
import '../../App.css'

const Model = props => {
    return (
        // <div id="outer_id" onClick={props.model_close}>
        <div className={props.className}>
            <input className="model_input" type="text" onChange={props.onChange} name="first_name" value={props.first_name} placeholder="First Name"/>
            <input className="model_input" type="text" onChange={props.onChange} name="last_name" value={props.last_name} placeholder="Last Name"/>
            <input className="model_input" type="text" onChange={props.onChange} name="credit_score" value={props.credit_score} placeholder="Credit Score"/>
            <button className="model_input" onClick={props.button_click}>Create new {props.create_type}</button>
        </div>
        // </div>
    )
}
export default Model;