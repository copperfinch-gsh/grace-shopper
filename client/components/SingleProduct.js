import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { getRange, formatWithCommas } from '../utils';

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNum: 1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      selectedNum: Number(event.target.value)
    });
  }

  handleClick(product) {
    this.props.addToCart({
      product: product,
      desiredQuantity: this.state.selectedNum
    });
  }

  render() {
    const { product } = this.props;
    return (
      <div>
        <Card bg="info" text="white" style={{ width: '20rem' }}>
          <Card.Img
            style={{ width: '20rem', height: '22rem' }}
            variant="top"
            src={product.imageUrl}
          />
          <Card.Body>
            <ul>
              <li>
                {product.manufacturer} {product.name}
              </li>
              <li>Price: ${formatWithCommas(product.price / 100)}</li>
            </ul>
            <div
              id="selector"
              style={{ display: 'flex', justifyContent: 'flex-start' }}
            >
              Qty:
              <select
                name="selectedName"
                value={this.state.selectedNum}
                onChange={this.handleChange}
              >
                {getRange(30).map(number => {
                  return (
                    <option key={number} value={number}>
                      {number}
                    </option>
                  );
                })}
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Button
                variant="primary"
                onClick={() => this.handleClick(product)}
              >
                Add to Cart
              </Button>
            </div>
          </Card.Body>
        </Card>
        <br />
      </div>
    );
  }
}

export default SingleProduct;
