import React from 'react';
import { ListGroup as div } from 'react-bootstrap';
import { formatWithCommas } from '../utils';

const OrderItem = ({
  name,
  color,
  manufacturer,
  price,
  quantity,
  imageUrl
}) => {
  return (
    <div variant="flush">
      <li className="order-list-container">
        <tr className="order-list-item">
          <td>{name}</td>
          <td>Color: {color}</td>
          <td>
            <img src={imageUrl} alt="product image" />
          </td>
          <td>By: {manufacturer}</td>
          <td className="num">Q: {quantity}</td>
          <td className="num">${formatWithCommas(Number(price) / 100)}</td>
        </tr>
      </li>
    </div>
  );
};

export default OrderItem;
