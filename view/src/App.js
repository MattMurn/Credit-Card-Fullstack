import React, { Component } from 'react';
import Navbar from './components/navbar';
import './App.css';
import Sidebar from './components/sidebar';
import Jumbotron from './components/jumbotron';
import Model from './components/model';
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      users: ["Matt Murnighan", "Abby Rose", "Mitchell Ness", "Hater Aid"],
      name: '',
      model_class: 'model_hide',
      new_customer: null,
      create_type: null
    }
  }
  componentDidMount = () => {
    // this.get_user_data();
  }
  componentWillUpdate = () => {
    // this.model_toggle();
  }
  jumbotronAction = event => {   
    event.preventDefault();
    this.setState({name: event.target.value})
    // const { name, value } = event.target;
    console.log(this.state.name);
    // this.setState({new_customer: value});
  }
  model_toggle = () => {
    let { model_class } = this.state;
    return (model_class === 'model_hide') ? this.setState({model_class: 'model_show'}) : this.setState({model_class: 'model_hide'})

  }
  add_new_customer = event => {
    this.model_toggle();
    console.log(event.target)
    //get 
  }
  data_change = event => {
    const { name, value } = event.target;
    (this.setState({ [name]: value}))
    console.log(this.state.test)
  }
  render() {
    return (
      <div className="App">
        <Navbar update_click={this.model_toggle}/>
        <Sidebar onClick={()=> this.setState({model_class: 'model_hide'})}>
          {this.state.users.map((name,i) => {
            return (
              <button className="users" type="sumbit" key={i} name="test" value={name} onClick={this.jumbotronAction}>
                {name}
              </button>
            )
          })}
        </Sidebar>

        <Jumbotron>
          <Model class_={this.state.model_class}
                  button_click={this.add_new_customer}
                  // model_close={this.model_toggle}
                  name={this.state.name}
                  />
          <div className="current_user"></div>
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