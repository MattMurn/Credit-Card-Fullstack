import React, { Component } from 'react';
import Navbar from './components/navbar';
import './App.css';
import Sidebar from './components/sidebar';
import Jumbotron from './components/jumbotron';
import { Modal, Transaction, Card, Customer} from './components/modal';
import Axios from 'axios';
import CardDetails from './components/cardDetails';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      customers: [],
      modal_class: 'modal_hide',
      name: null,
      current_customer: {},
      current_action: {},
      cards: [],
      modal_type: null,
      trans_btn: 'trans_hide',
      card_btn: 'card_hide',
      current_card: ''// as mouse enters into componenet, current card updates.
    };
  };
  componentWillMount = () => {
    Axios.get('/allCustomers').then(data => this.setState({customers: data.data}))
  };
  get_card_data = (id) => {
    Axios.post('/customerCards', id)
    .then(response => {
      let card_array = response.data;
      this.setState({cards: card_array})
    });
  };
  jumbotronAction = event => { 
    //-1 used to offset difference in customer array & db id.  
    this.setState({current_customer:  this.state.customers[event.target.name-1]});
    this.setState({name: ` Welcome, ${this.state.current_customer.first_name}`})
    this.get_card_data(this.state.customers[event.target.name-1]);
    this.setState({card_btn: 'card_show'});
  };
  modalToggle = event => {
    this.setState({modal_type: event.target.value})
    let { modal_class } = this.state;
    (modal_class === 'modal_hide') ? this.setState({modal_class: 'modal_show'}) : this.setState({modal_class: 'modal_hide'})
  };
  get_trans_data = event => {
    let request = this.state.cards[event.target.value];
    Axios.post('/cardTransactions', request).then(data => console.log(data));
  };
  send_current_action = () => {
    const {current_action, modal_type } = this.state;
    console.log(current_action);
    if(modal_type === 'new_customer'){
      this.setState(prevState => ({
        customers: [...prevState.customers, current_action]
      }));
    }
    Axios.post('/currentAction', current_action)
    .then(response => console.log(response));
  }
  change_handler = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
        'current_action':{
          ...prevState.current_action,
          modal_type: this.state.modal_type,
          customer_id: this.state.current_customer.id,
          [name]: value
        }
      })
    );
  };
  modal_render = () => {

    switch(this.state.modal_type){
      case 'new_transaction':
        return <Transaction button_click={this.send_current_action} onChange={this.change_handler}/>
      case 'new_card':
        return <Card button_click={this.send_current_action} onChange={this.change_handler}/>
      case 'new_customer':
        return <Customer className={this.state.modal_class} button_click={this.send_current_action} onChange={this.change_handler}/>
      default:
        break;
    };
  }
  render() {
    return (
      <div className="App">
        <Navbar update_click={this.modalToggle}
                card_btn={this.state.card_btn}
                trans_btn={this.state.trans_btn}>
        </Navbar>
        <Modal className={this.state.modal_class}>
          {this.modal_render()}
        </Modal>
        <Sidebar onClick={()=> this.setState({modal_class: 'modal_hide'})}>
          {this.state.customers.map((obj,i) => {
            return (
              <button className="buttons customers customers" type="sumbit"
                key={obj.id} name={obj.id} value={obj.first_name + " " + obj.last_name} onClick={this.jumbotronAction}>
                {obj.first_name + " " + obj.last_name}
              </button>
            )
          })}
        </Sidebar>
        <Jumbotron name={this.state.name}>
          {this.state.cards.map((data, i)=> {
            return <CardDetails card_id={data.id}
                    balance={data.current_balance}
                    limit={data.credit_limit}
                    value={i}
                    key={i}
                    onClick={this.get_trans_data}/>
          })}
        </Jumbotron>
      </div>
    );
  }
}
export default App;
