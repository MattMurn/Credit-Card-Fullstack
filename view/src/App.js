import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import { Jumbotron, Profile, CardDisplay,
          CurrentCard, CardDetails, TransRow, 
          TransHistory, Chart } from './components/jumbotron';
import { Modal, Transaction, Card, Customer} from './components/modal';
import { PieChart, Pie } from 'recharts';
import Axios from 'axios';
import {num_convert, date_convert, transaction_validation } from './helper_functions';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      customers: [],
      modal_class: 'modal_hide',
      jumbotron_class: 'jumbo_hide',
      current_customer: {},
      current_action: {},
      cards: [],
      trans_btn: 'trans_hide',
      card_btn: 'card_hide',
      card_display: 'card_display',
      current_card: null,// as mouse enters into componenet, current card updates.
      transaction_timestamp: new Date(),
      trans_display: 'trans_hide',
      profile_card_display: 'profile_card_hide',
      trans_history: []
    };
  };
  componentWillMount = () => {

    Axios.get('/allCustomers').then(data =>{
      this.setState({customers: data.data})})
  };

  card_data = id => {

    Axios.post('/customerCards', id)
    .then(response => this.setState({cards: response.data}));
  };

  jumbotronAction = event => { 
    //-1 used to offset difference in customer array & db id.
    let local_id = (event.target.name) -1;
    this.setState({
      jumbotron_class: 'jumbotron',
      current_customer:  this.state.customers[local_id],
      card_btn: 'card_show',
      card_display: 'card_display',
      trans_btn: 'trans_show',
      trans_display: 'trans_hide',
      current_card: null
  });
    this.card_data(this.state.customers[local_id])
  };

  close_modal = event => {

    if(event.target.className === 'modal_show' || event.target.className === 'ex'){
      this.setState({modal_class: 'modal_hide'})
    };
  };

  open_modal = event => {
    console.log(event.target)
    if(event.target.value === 'new_transaction' && this.state.current_card === null){
      return alert('please select a card or create a new one!')
    }
    this.setState({
      modal_class: 'modal_show',
      modal_type: event.target.value
    });
  };

  get_trans_data = event => {

    let local_card_id = event.target.value;
    let trans_card_id = this.state.cards[local_card_id].id

    Axios.post('/cardTransactions', {id: trans_card_id})
    .then(data => {

      this.setState({
        current_card: this.state.cards[local_card_id],        
        trans_history: data.data,
        card_display: 'card_display_hide',
        trans_display: 'trans_history',
        profile_card_display: 'profile_card'
      })
    });
  };

  send_current_action = () => {

    const { current_action, modal_type, current_card, transaction_timestamp } = this.state;
    
    if(modal_type === 'new_customer'){

      this.setState(prevState => ({
        customers: [...prevState.customers, current_action],
        modal_class: 'modal_hide',
        current_customer: current_action
      }));
    }

    if(modal_type === 'new_transaction'){
      let timestamp = new Date (transaction_timestamp);
      
      if(!transaction_validation(current_action, current_card)){
        return;
      }
        current_action.transaction_timestamp = timestamp;
        current_action.card_id = current_card.id;
        current_action.current_balance = current_card.current_balance;
        current_action.transaction_approved = true;
       // update state with new transaction data
        this.setState(prevState => ({
          trans_history: [current_action, ...prevState.trans_history],
          modal_class: 'modal_hide',
          current_card: {...current_card,
            current_balance: (current_action.transaction_type === 'payment') ?
            current_card.current_balance - parseFloat(current_action.transaction_amount) :
            current_card.current_balance + parseFloat(current_action.transaction_amount)
          }
        }))
      }
      //send current_action object to server 
      Axios.post('/currentAction', current_action)
      .catch(response => {console.log(response)})
  }

  change_handler = event => {

    const { name, value } = event.target;
    const { modal_type, current_customer, transaction_timestamp } = this.state;

    this.setState((prevState) => ({
        'current_action':{
          ...prevState.current_action,
          modal_type: modal_type,
          customer_id: current_customer.id,
          [name]: value,
          transaction_timestamp: JSON.stringify(transaction_timestamp)
        }
      })
    );
  };

  change_date = date => {
    this.setState({transaction_timestamp: date})
  };

  modal_render = () => {

    switch(this.state.modal_type){
      case 'new_transaction':
        return <Transaction button_click={this.send_current_action} onChange={this.change_handler}>
        <DatePicker 
            className="modal_input"
            id="date_picker"
            selected={this.state.transaction_timestamp}
            onChange={this.change_date}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            name="transaction_timestamp"
            popperClassName="popper_override"
          />
        </Transaction>
      case 'new_card':
        return <Card button_click={this.send_current_action} onChange={this.change_handler}/>
      case 'new_customer':
        return <Customer className={this.state.modal_class} inter_class='model_content' button_click={this.send_current_action} onChange={this.change_handler}/>
      default:
        break;
    };
  };
  render_mini = () => {

    if(this.state.current_card){
      return <CurrentCard
        className={this.state.profile_card_display}
        mini_card_number={this.state.current_card.id}
        mini_card_balance={this.state.current_card.current_balance}
        onClick={() => {

          this.setState({
            trans_display: 'trans_hide',
            card_display: 'card_display',
          })
        }}
   />
    }
  }

  render() {

    const { card_btn, modal_class,current_customer, 
            jumbotron_class, card_display, trans_display, 
            customers, cards, trans_btn, trans_history } = this.state;
    console.log(this.state.current_card);
    return (
      <Router>
        <div className="App">
          <Navbar update_click={this.open_modal}
                  card_btn={card_btn}
                  trans_btn={trans_btn}>
          </Navbar>
          <Route  path='/modal'>
          <Modal className={modal_class} onClick={this.close_modal}> 
            {/* {this.modal_render()} */}
          </Modal>
          </Route>
          <Sidebar>
            {customers.map((obj,i) => {
              return (
                <Link to='/' className="customer_button customers" type="sumbit"
                  key={i} name={obj.id} value={obj.first_name + " " + obj.last_name} onClick={this.jumbotronAction}>
                  {obj.first_name + " " + obj.last_name}
                </Link>
              )
            })}
          </Sidebar>
          {/* pass route / match from link */}
          <Jumbotron className={jumbotron_class}>
            <Profile name={current_customer.first_name}
              credit_score={current_customer.credit_score}
            >

            {/* using render_mini method to render card info when looking
              transactions. consider changing using router module */}
                {this.render_mini()}
            </Profile>

            <CardDisplay card_display_class={card_display}>
              {cards.map((data, i)=> {
                return <CardDetails card_id={data.id}
                          balance={num_convert(data.current_balance)}
                          limit={num_convert(data.credit_limit)}
                          value={i}
                          key={data.id}
                          onClick={this.get_trans_data}/>
              })}
            </CardDisplay>
            <TransHistory className={trans_display}>
              {trans_history.map((element, i)=> {
                return  <TransRow 
                    timestamp={date_convert(element.transaction_timestamp)} 
                    id={element.id} 
                    type={element.transaction_type} 
                    key={i}
                    balance={num_convert(element.current_balance)}
                    amount={num_convert(element.transaction_amount)}
                />
            })}
          </TransHistory>
          </Jumbotron>
        </div>
      </Router>
    );
  };
};
export default App;


/*

const { PieChart, Pie, Sector, Cell } = Recharts;
const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
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

const SimplePieChart = React.createClass({
	render () {
  	return (
    	<PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data} 
          cx={300} 
          cy={200} 
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80} 
          fill="#8884d8"
        >
        	{
          	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
    );
  }
})

ReactDOM.render(
  <SimplePieChart />,
  document.getElementById('container')
);

*/