import React from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const CartProduct = ({ item, handleChange, deleteItem }) => {
  return (
    <div>
      <Card style={{ width: '40rem', height: '10rem' }}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Button
              variant="danger"
              onClick={() => {
                deleteItem(item);
              }}
            >
              Delete
            </Button>
            <select
              id="quantity-selector"
              onChange={event => handleChange(event, item)}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => {
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
            </select>{' '}
            <b>Item: </b>
            {item.name}
            <img src={item.imageUrl} width="110px" height="125px" />
            {'\n'}
            <b>Price:</b> ${item.price * item.desiredQuantity / 100}
          </ListGroup.Item>
        </ListGroup>
      </Card>
      {/* <Card bg="info" text="white" style={{ width: '20rem' }}>
        <Card.Img
          style={{ width: '20rem', height: '22rem' }}
          variant="top"
          src={item.imageUrl}
        />
        <Card.Body>
          <Card.Text>
            <div> {item.name} </div>
            <div> Price: ${item.price * item.desiredQuantity / 100} </div>
          </Card.Text>
          <div>
            {' '}
            <select onChange={event => handleChange(event, item)}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => {
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
            </select>{' '}
            <Button
              variant="danger"
              onClick={() => {
                deleteItem(item);
              }}
            >
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>; */}
    </div>
  );
};

export default CartProduct;
