import React from 'react';

const OrderItem = ({ name, color, manufacturer, price, quantity }) => {
  return (
    <li>
      <div>Product: {name}</div>
      <div>Color: {color}</div>
      <div>Manufacturer: {manufacturer}</div>
      <div>Price: ${Number(price) / 100}</div>
      <div>Quantity: {quantity}</div>
    </li>
  );
};

export default OrderItem;
