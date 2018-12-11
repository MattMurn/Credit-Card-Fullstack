import React, { Component } from 'react';
import Navbar from './components/navbar';
import './App.css';
import Sidebar from './components/sidebar';
import Jumbotron from './components/jumbotron';
import Model from './components/model';
import Axios from 'axios';
import CardDetails from './components/cardDetails';
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      users: [],
      model_class: 'model_hide',
      name: null,
      new_customer: {},
      current_user: {},
      cards: []
    };
  };
  componentWillMount = () => {
    Axios.get('/allUsers').then(data => this.setState({users: data.data}))
  };
  get_card_data = (id) => {
    Axios.post('/userCards', id)
    .then(response => {
      let card_array = response.data;
      this.setState({cards: card_array})
    });
  };
  jumbotronAction = event => {   
    let local_user = this.state.users[event.target.name];
    this.setState({current_user: local_user});
    this.setState({name: ` Welcome, ${local_user.first_name}`})
    this.get_card_data(this.state.users[event.target.name]);
  };
  modelToggle = () => {
    console.log('model toggle')
    let { model_class } = this.state;
    (model_class === 'model_hide') ? this.setState({model_class: 'model_show'}) : this.setState({model_class: 'model_hide'})
    console.log(this.state.model_class)
  };
  get_trans_data = event => {

    let request = this.state.cards[event.target.value];
    Axios.post('/cardTransactions', request).then(data => console.log(data));
  };
  add_new_customer = () => {
    this.setState(prevState => ({
      users: [...prevState.users, this.state.new_customer]
    }))
    Axios.post('/createCustomer', this.state.new_customer)
    .catch(err => console.log(err));
    this.modelToggle();
  };
  change_handler = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      new_customer: {
        ...prevState.new_customer,
        [name]: value
      }
    }));
  };
  render() {
    return (
      <div className="App">
        <Navbar update_click={this.modelToggle}/>
        <Sidebar onClick={()=> this.setState({model_class: 'model_hide'})}>
          {this.state.users.map((obj,i) => {
            return (
              <button className="buttons users customers" type="sumbit"
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
        <Model className={this.state.model_class}
                  button_click={this.add_new_customer}
                  onChange={this.change_handler}
                  />
      </div>
    );
  }
}
export default App;
