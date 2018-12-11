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
      new_customer: null,
      name: null,
      current_user: {},
      cards: []
    }
  }
  componentWillMount = () => {
    Axios.get('/allUsers').then(data => this.setState({users: data.data}))
  }
  get_card_data = (id) => {
    Axios.post('/userCards', id)
    .then(res => {
      let card_array = res.data;
      console.log(card_array);
      this.setState({cards: card_array})
    })
    // console.log(this.state.current_user)
  }
  jumbotronAction = event => {   
    let local_user = this.state.users[event.target.name];
    this.setState({current_user: local_user});
    this.setState({name: ` Welcome, ${local_user.first_name}`})
    this.get_card_data(this.state.users[event.target.name]);
  }
  modelToggle = () => {
    let { model_class } = this.state;
    return (model_class === 'model_hide') ? this.setState({model_class: 'model_show'}) : this.setState({model_class: 'model_hide'})
  }
  render() {
    return (
      <div className="App">
        <Navbar update_click={this.model_toggle}/>
        <Sidebar onClick={()=> this.setState({model_class: 'model_hide'})}>
          {this.state.users.map((obj,i) => {
            return (
              <button className="buttons users customers" type="sumbit"
               key={i} name={i} value={obj.first_name + " " + obj.last_name} onClick={this.jumbotronAction}>
                {obj.first_name + " " + obj.last_name}
              </button>
            )
          })}
        </Sidebar>

        <Jumbotron name={this.state.name}
          cards={this.state.cards.map((data, i)=> {
            return <CardDetails card_id={i}
                    balance={data.current_balance}
                    limit={data.credit_limit}
                    key={i}/>
          })}>
          <Model class_={this.state.model_class}
                  button_click={this.add_new_customer}
                  />
        </Jumbotron>
      </div>
    );
  }
}

export default App;


/* 
          list of components:
            sidebar with user names;
              button to get user info
            jumbotron with user info;
              cards associated with user.
              button to get card transactions.
            container with each transaction info below jumbotron;
*/ 

// get_user_data = (name) => {
  // fetch('/test', {
  //   method: "GET",
  //   headers: {
  //     "Accept": "application/json"
  //   }
  // })
  // .then(response => {
  //   // data.json();
  //   console.log(response);
  // })
  // console.log('name hit')
  // fetch('/test/post', {
  //   method: "POST",
  //   headers: {
  //     "Accept": "application/json"
  //   }
  // })
// };