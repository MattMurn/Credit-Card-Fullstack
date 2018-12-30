import React from 'react';
import { PieChart, Pie } from 'recharts';
const jumbotron = props => {
    
    return (
        <div>
            <div className={props.className}>
                {props.children} 
            </div>
        </div>
    )
}
const profile = props => {

    return (
        <div className="profile">
                    <img className="profile_img"src="https://northmemorial.com/wp-content/uploads/2016/10/PersonPlaceholder-300x300.png" alt="#"/>
                    <div className="profile_info">
                        <div className="profile_name">{props.name}</div>
                        <div className="profile_credit_score"> Your current credit score is: {props.credit_score}</div>
                    </div>
                    {props.children}
                </div>
    )
}
const currentCard = props => {
    return (
        <div className={props.className}>
            <div className="mini">Card Id: {props.mini_card_number}</div>
            <div className="mini">Current Balance: ${props.mini_card_balance}</div>
            <button className="back" onClick={props.onClick}>cards</button>
        </div>
    )
}
const cardDisplay = props => {

    return (
        <div className={props.card_display_class}>
            {props.children}
        </div>
    )
}
const cardDetails = props => {

    return (
        <button className="display_buttons card_details" onClick={props.onClick}  value={props.value}>
            Card: {props.value}
            <br/>
            <br/>
            Bal: ${props.balance}
            <br/>
            <br/>
            Limit: ${props.limit}
            <br/>
            <br/>            
            See Details
        </button>
    )
}
const transHistory = props => {
    
    return (

        <div className={props.className}> 
            <table>
                <thead>
                <tr>
                    <th> Time </th>
                    <th> Amount </th>
                    <th> Type </th>
                    <th> Id </th>
                </tr>
                </thead>
                <tbody>
                    {props.children}
                </tbody>
            </table>

        </div>
    )
}

const transRow = props => {

    return (
        <tr>
                <td className="trans_prop">{props.timestamp}</td>
                <td className="trans_prop">${props.amount}</td>
                <td className="trans_prop">{props.type}</td>
                <td className="trans_prop">{props.id}</td>
                <td className="trans_prop">{props.balance}</td>
            </tr>
    )
}

const chart = props => {
    let test_data = [{name: "credit score", value: 750}]
    return (
        <PieChart width={400} height={400}>
            <Pie isAnimationActive={false} data={test_data} cx={200} cy={200} outerRadius={80} fill="#8884d8" label/>
        </PieChart>
    )
}
export const Jumbotron = jumbotron;
export const Profile  = profile;
export const CardDisplay = cardDisplay;
export const CurrentCard = currentCard;
export const CardDetails = cardDetails;
export const TransHistory = transHistory;
export const TransRow = transRow;
export const Chart = chart;

/*
const {PieChart, Pie, Legend, Tooltip} = Recharts;

const data01 = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200},
                  {name: 'Group E', value: 278}, {name: 'Group F', value: 189}]

const data02 = [{name: 'Group A', value: 2400}, {name: 'Group B', value: 4567},
                  {name: 'Group C', value: 1398}, {name: 'Group D', value: 9800},
                  {name: 'Group E', value: 3908}, {name: 'Group F', value: 4800}];

const TwoSimplePieChart = React.createClass({
	render () {
  	return (
    	<PieChart width={800} height={400}>
        <Pie isAnimationActive={false} data={data01} cx={200} cy={200} outerRadius={80} fill="#8884d8" label/>
        <Pie data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d"/>
        <Tooltip/>
       </PieChart>
    );
  }
})

ReactDOM.render(
  <TwoSimplePieChart />,
  document.getElementById('container')
);

*/