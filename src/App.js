import React, { Component } from 'react';
import './App.css';
import SimpleMap from '../src/components/Map/index.js'
import List from '../src/components/Restaurants/index.js'

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
      .then((response) => {
        console.log('response.data', response.data);
        this.setState({ restaurants: response.data })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

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
