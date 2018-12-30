import React, { Component } from 'react';
import './App.css';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import { Jumbotron, Profile, CardDisplay, CurrentCard, CardDetails, TransRow, TransHistory, Chart } from './components/jumbotron';
import { Modal, Transaction, Card, Customer} from './components/modal';
import { PieChart, Pie } from 'recharts';
import Axios from 'axios';

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
      start_date: new Date(),
      trans_display: 'trans_hide',
      profile_card_display: 'profile_card_hide',
      trans_history: []
    };
  };

  componentWillMount = () => {

    Axios.get('/allCustomers').then(data =>{
      console.log(data);
      this.setState({customers: data.data})})
  };
    // sending card data to server.
  get_card_data = id => {

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

    this.get_card_data(this.state.customers[local_id])
  };

  close_modal = event => {

    if(event.target.className === 'modal_show' || event.target.className === 'ex'){
      this.setState({modal_class: 'modal_hide'})
    };
  };

  open_modal = event => {

    if(event.target.value === 'new_transaction' && this.state.current_card === null){
      return alert('please select a card or create a new one!')
    }
    this.setState({
      modal_class: 'modal_show',
      modal_type: event.target.value
    });
  };

  get_trans_data = event => {

    // let request = this.state.current_card;
    console.log(this.state.cards);
    console.log(event.target.value)
    let local_card_id = event.target.value;
    let trans_card_id = this.state.cards[local_card_id].id
    // this.setState({current_card: this.state.cards[event.target.value]})
    Axios.post('/cardTransactions', {id: trans_card_id})
    .then(data => {
      console.log(data);
      this.setState({
      current_card: this.state.cards[local_card_id],      
      trans_history: data.data,
      card_display: 'card_display_hide',
      trans_display: 'trans_history',
      profile_card_display: 'profile_card'
    })
    })
  };

  send_current_action = () => {
    
    const {current_action, modal_type, current_card, start_date } = this.state;
    if(modal_type === 'new_customer'){
      this.setState(prevState => ({
        customers: [...prevState.customers, current_action],
        modal_class: 'modal_hide',
        current_customer: current_action
      }));
    }
    if(modal_type === 'new_transaction'){
      if((parseFloat(current_action.amount) + parseFloat(current_card.current_balance)) > parseFloat(current_card.credit_limit)){
        return alert('this transaction exceeds current balance')  
      };
      if(current_action.amount > current_card.current_balance && current_action.transaction_type === 'payment'){
        alert('this payment is more than your current balance.')
      }
      current_action.card_id = current_card.id;
      current_action.start_date = start_date;
      current_action.current_balance = current_card.current_balance;
      console.log(this.state.current_action);
      this.setState(prevState => ({trans_history: [...prevState.trans_history, current_action]}))
    }
    this.setState({ modal_class: 'modal_hide'})
    console.log(this.state.current_card)
    Axios.post('/currentAction', current_action)
    .catch(response => {console.log(response)})
  };

  change_handler = event => {

    const { name, value } = event.target;
    const { modal_type, current_customer, start_date } = this.state;
    this.setState((prevState) => ({
        'current_action':{
          ...prevState.current_action,
          modal_type: modal_type,
          customer_id: current_customer.id,
          [name]: value,
          start_date: start_date
        }
      })
    );
  };

  change_date = date => {

    this.setState({start_date: date})
  };

  modal_render = () => {

    switch(this.state.modal_type){
      case 'new_transaction':
        return <Transaction button_click={this.send_current_action} onChange={this.change_handler}>
        <DatePicker 
            className="modal_input"
            id="date_picker"
            selected={this.state.start_date}
            onChange={this.change_date}
            showTimeSelect
            dateFormat="Pp"
            name="date"
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
          console.log('profile hit')
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

    return (
      <div className="App">
        <Navbar update_click={this.open_modal}
                card_btn={card_btn}
                trans_btn={trans_btn}>
        </Navbar>
        <Modal className={modal_class} onClick={this.close_modal}> 
          {this.modal_render()}
        </Modal>
        <Sidebar>
          {customers.map((obj,i) => {
            return (
              <button className="customer_button customers" type="sumbit"
                key={i} name={obj.id} value={obj.first_name + " " + obj.last_name} onClick={this.jumbotronAction}>
                {obj.first_name + " " + obj.last_name}
              </button>
            )
          })}
        </Sidebar>
        <Jumbotron className={jumbotron_class}>
          <Profile name={current_customer.first_name}
            credit_score={current_customer.credit_score}
          >
        <PieChart width={200} height={200}>
            <Pie isAnimationActive={false} data={[{name: "credit score", value: 750}]} cx={100} cy={100} outerRadius={80} fill="#8884d8" label/>
        </PieChart>
          {/* using render_mini method to render card info when looking
            transactions. consider changing using router module */}
              {this.render_mini()}
          </Profile>

          <CardDisplay card_display_class={card_display}>
            {cards.map((data, i)=> {
              return <CardDetails card_id={data.id}
                        balance={data.current_balance}
                        limit={data.credit_limit}
                        value={i}
                        key={data.id}
                        onClick={this.get_trans_data}/>
            })}
          </CardDisplay>
          <TransHistory className={trans_display}>
          {trans_history.map((element, i)=> {
          return  <TransRow 
              timestamp={element.transaction_timestamp} 
              id={element.id} type={element.transaction_type} 
              key={i}
              amount={element.transaction_amount}
          />
          })}
        </TransHistory>
        </Jumbotron>
      </div>
    );
  };
};
export default App;
