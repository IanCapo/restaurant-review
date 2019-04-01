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
  // change restaurants.js to json and than fetch data inside componentDidMount
  getInitialstate() {
    return restaurants
  }

  render() {

    return (
      <div className="App">
        <SimpleMap restaurants={this.state.restaurants} />
        <List restaurants={this.state.restaurants} />
      </div>
    );

  }
}

export default App;
