import React, { Component } from 'react';
import Navbar from './components/navbar';
import './App.css';
import Sidebar from './components/sidebar';
import Jumbotron from './components/jumbotron';
class App extends Component {
  constructor(){
    super()
    this.state = {
      users: ["Matt Murnighan", "Abby Rose", "Mitchell Ness", "Hater Aid"],
      test_user: {
        name: null
      }
    }
  }
  componentDidMount = () => {
    this.get_user_data();
  }
  get_user_data = (name) => {
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
    console.log('name hit')
    // fetch('/test/post', {
    //   method: "POST",
    //   headers: {
    //     "Accept": "application/json"
    //   }
    // })
  };
  jumbotron_action = () => {
    this.setState({test_user: { name: 'MAJOR PAYNE'}})
  }
  render() {
    return (
      <div className="App">
        <Navbar/>
        <Sidebar>
          {this.state.users.map((name,i) => {
            return (
              <div className="users" key={i} onClick={this.jumbotron_action}>
                {name}
              </div>
            )
          })}
        </Sidebar>
        <Jumbotron>
          <div>{this.state.test_user.name}</div>
        </Jumbotron>
        {/* 
          list of components:
            sidebar with user names;
              button to get user info
            jumbotron with user info;
              cards associated with user.
              button to get card transactions.
            container with each transaction info below jumbotron;


        */}
      </div>
    );
  }
}

export default App;
