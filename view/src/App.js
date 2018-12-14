import React, { Component } from 'react';
import Navbar from './components/navbar';
import './App.css';
import Sidebar from './components/sidebar';
import Jumbotron from './components/jumbotron';
import { Model, Transaction, Card, Customer} from './components/model';
import Axios from 'axios';
import CardDetails from './components/cardDetails';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      customers: [],
      model_class: 'model_hide',
      name: null,
      current_customer: {},
      current_action: {},
      cards: [],
      model_type: null,
      trans_btn: 'trans_hide',
      card_btn: 'card_hide',
      current_card: ''// as mouse enters into componenet, current card updates.
    };
  };
  componentWillMount = () => {
    Axios.get('/allCustomers').then(data => this.setState({customers: data.data}))
  };
  componentDidUpdate = () => {
    if(this.state.current_customer.id > 0) {
      this.setState({card_btn: 'card_show'});
      // console.log('there is a customer', this.state.current_customer);
    }
    else if(this.state.cards){
      console.log('card_array is more than 1')
    }

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
    let local_customer = this.state.customers[event.target.name-1];
    this.setState({current_customer: local_customer});
    this.setState({name: ` Welcome, ${local_customer.first_name}`})
    this.get_card_data(this.state.customers[event.target.name-1]);
  };
  modelToggle = event => {
    this.setState({model_type: event.target.value})
    let { model_class } = this.state;
    (model_class === 'model_hide') ? this.setState({model_class: 'model_show'}) : this.setState({model_class: 'model_hide'})
  };
  get_trans_data = event => {
    let request = this.state.cards[event.target.value];
    Axios.post('/cardTransactions', request).then(data => console.log(data));
  };
  send_current_action = () => {
    const {current_action, model_type } = this.state;
    console.log(current_action);
    if(model_type === 'new_customer'){
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
          model_type: this.state.model_type,
          customer_id: this.state.current_customer.id,
          [name]: value
        }
      })
    );
  };
  model_render = () => {

    switch(this.state.model_type){
      case 'new_transaction':
        return <Transaction button_click={this.send_current_action} onChange={this.change_handler}/>
      case 'new_card':
        return <Card button_click={this.send_current_action} onChange={this.change_handler}/>
      case 'new_customer':
        return <Customer button_click={this.send_current_action} onChange={this.change_handler}/>
      default:
        break;
    };
  }
  render() {
    return (
      <div className="App">
        <Navbar update_click={this.modelToggle}
                card_btn={this.state.card_btn}
                trans_btn={this.state.trans_btn}/>
        <Sidebar onClick={()=> this.setState({model_class: 'model_hide'})}>
          {this.state.customers.map((obj,i) => {
            return (
              <button className="buttons customers customers" type="sumbit"
                key={obj.id} name={obj.id} value={obj.first_name + " " + obj.last_name} onClick={this.jumbotronAction}>
                {obj.first_name + " " + obj.last_name}
              </button>
            )
          })}
        </Sidebar>
        <Jumbotron name={this.state.name}
          cards={this.state.cards.map((data, i)=> {
            return <CardDetails card_id={data.id}
                    balance={data.current_balance}
                    limit={data.credit_limit}
                    value={i}
                    key={i}
                    onClick={this.get_trans_data}/>
          })}>
        </Jumbotron>
        <Model className={this.state.model_class}>
          {this.model_render()}
        </Model>

      </div>
    );
  }
}
export default App;
