import React, { Component } from 'react';
import './App.css';
import {getOrders, postToOrders, deleteOrder} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    getOrders()
      .then(data => this.setState({ orders: data.orders }))
      .catch(err => console.error('Error fetching:', err));
  }

  addNewOrder = (newOrder) => {
    postToOrders(newOrder)
      .then(data => this.setState({ orders: [...this.state.orders, data] }))
  }

  deleteCompletedOrder = (event) => {
    deleteOrder(parseInt(event.target.id))
      .then(() => {
        getOrders()
          .then(data => this.setState({ orders: data.orders }))
      })
      .catch(err => console.error('Error fetching:', err))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addNewOrder={this.addNewOrder} />
        </header>

        <Orders orders={this.state.orders} deleteCompletedOrder={this.deleteCompletedOrder} />
      </main>
    );
  }
}


export default App;
