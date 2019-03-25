import React, { Component } from 'react';
import './App.css';
import SimpleMap from './Components/Map'
import List from './Components/List'
import restaurants from './restaurants'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialstate()
  }

  getInitialstate() {
    return restaurants
  }

  render() {

    return (
      <div className="App">
        <SimpleMap />
        <List restaurants={this.state.restaurants} />
      </div>
    );

  }
}

export default App;
