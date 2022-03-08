import React from 'react';
import './Orders.css';

const Orders = props => {
  const orderEls = props.orders.map(order => {
    return (
      <div className="order" key={order.id}>
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map(ingredient => {
            return <li key={ingredient}>{ingredient}</li>
          })}
        </ul>
        <button className='delete-button' id={order.id} onClick={event => props.deleteCompletedOrder(event)}>Completed Order? DELETE</button>
      </div>
    )
  });

  return (
    <section className='order-section'>
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;