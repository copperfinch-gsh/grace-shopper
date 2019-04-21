import React from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

const CartProduct = ({ item, handleChange, deleteItem }) => {
  return (
    <div>
      <Card bg="info" text="white" style={{ width: '20rem' }}>
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
      </Card>;
    </div>
  );
};

export default CartProduct;
