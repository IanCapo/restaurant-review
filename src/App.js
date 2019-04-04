import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import SimpleMap from '../src/components/Map/Map'
import List from './components/Restaurants/List'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: []
    }
  }

  componentDidMount = () => {
    console.log('component did mount');
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
