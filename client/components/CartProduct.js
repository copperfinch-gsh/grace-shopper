import React from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { getRange, formatWithCommas } from '../utils';

const CartProduct = ({
  item,
  handleChange,
  deleteItem,
  fullQuantity = 30,
  admin = false
}) => {
  return (
    <div>
      <Card style={{ width: '40rem', height: '10rem' }}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Button
              variant="danger"
              onClick={() => {
                if (admin) {
                  deleteItem(item.id);
                } else {
                  deleteItem(item);
                }
              }}
            >
              Delete
            </Button>
            {item.desiredQuantity ? (
              <select
                id="quantity-selector"
                onChange={event => handleChange(event, item)}
              >
                {getRange(fullQuantity).map(number => {
                  return (
                    <option
                      key={number}
                      value={number}
                      selected={
                        item.desiredQuantity &&
                        number === Number(item.desiredQuantity)
                          ? 'selected'
                          : ''
                      }
                    >
                      {number}
                    </option>
                  );
                })}
              </select>
            ) : (
              <span>
                <b>Quantity:</b> {item.quantity}
              </span>
            )}
            <b>Item: </b>
            {item.name}
            <img src={item.imageUrl} width="110px" height="125px" />
            {'\n'}
            <b>Price:</b> ${item.desiredQuantity
              ? formatWithCommas(item.price * item.desiredQuantity / 100)
              : formatWithCommas(item.price / 100)}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

export default CartProduct;
