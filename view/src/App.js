import React, { Component } from 'react';
import './App.css';
import Sidebar from './components/sidebar';
class App extends Component {
  constructor(){
    super()
    this.state = {

    }
  }
  render() {
    return (
      <div className="App">
        <Sidebar/>
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
