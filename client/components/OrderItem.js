import React from 'react';

const OrderItem = ({ name, color, manufacturer, price, quantity }) => {
  return (
    <li>
      <div>Product: {name}</div>
      <div>Color: {color}</div>
      <div>Manufacturer: {manufacturer}</div>
      <div>Price: ${formatWithCommas(Number(price) / 100)}</div>
      <div>Quantity: {quantity}</div>
    </li>
  );
};

export default OrderItem;

//utils file
function formatWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
