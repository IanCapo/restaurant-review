import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import SimpleMap from './Components/Map'
import List from './Components/List'
// import restaurants from './restaurants'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: []
    }
  }

  componentDidMount = () => {
    console.log('conponent did mount');
    axios.get('./data.json')
    .then( (response) => {
      console.log('response.data', response.data);
      this.setState( {restaurants : response.data} )
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  // getInitialstate() {
  //   return restaurants
  // }

  render() {
    console.log('this.state.restaurants', this.state.restaurants);
    return (
      <div className="App">
        <SimpleMap restaurants={this.state.restaurants} />
        <List restaurants={this.state.restaurants} />
      </div>
    );

  }
}

export default App;
