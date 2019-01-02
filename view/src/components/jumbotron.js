import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
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
                    <th> Balance </th>
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
            <td className="trans_prop">${props.balance}</td>
        </tr>
    )
}

const chart = props => {
    const data = [{name: 'Bad', value: '< 400'}, {name: 'Good', value: '500 - 700'},
    {name: 'Excellent', value: ' > 700'}];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
    return (
    	<PieChart width={200} height={200}>
        <Pie
          data={data} 
          cx={300} 
          cy={200} 
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80} 
          fill="#8884d8"
        >
        	{/* {
          	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          } */}
        </Pie>
      </PieChart>
    );
}
export const Jumbotron = jumbotron;
export const Profile  = profile;
export const CardDisplay = cardDisplay;
export const CurrentCard = currentCard;
export const CardDetails = cardDetails;
export const TransHistory = transHistory;
export const TransRow = transRow;
export const Chart = chart;
