import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../Base';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  }

  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef)});
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {
    // Take a copy of the existing state
    const fishes = {...this.state.fishes};
    // Add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // set the new fishes object to state
    this.setState({fishes});
  };

  updateFish = (key, updatedFish) => {
    // take a copy of the state
    const fishes = {...this.state.fishes };
    // update the state
    fishes[key] = updatedFish;
    // set that to state
    this.setState({fishes: fishes});
  }

  loadSampleFishes = () => {
    this.setState({fishes: sampleFishes});
  };

  deleteFish = (key) => {
    const fishes = { ...this.state.fishes };

    fishes[key] = null;

    this.setState({fishes});
  }

  addToOrder = (key) => {
    const order = {...this.state.order};
    order[key] = order[key] + 1 || 1;
    this.setState({order});
  }

  removeFromOrder = (key) => {
    const order = {...this.state.order};
    delete order[key];
    this.setState({order});
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => 
              <Fish key={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} index={key}/>
            )}
          </ul>
        </div>
        <Order fishes={this.state.fishes} removeFromOrder={this.removeFromOrder} order={this.state.order}/>
        <Inventory fishes={this.state.fishes} addFish={this.addFish} updateFish={this.updateFish} deleteFish={this.deleteFish} loadSampleFishes={this.loadSampleFishes}/>
      </div>
    );
  }
}

export default App;