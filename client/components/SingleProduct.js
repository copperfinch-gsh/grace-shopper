import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

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

  async handleClick(product) {
    await this.props.addToCart({
      product,
      desiredQuantity: this.state.selectedNum
    });
  }

  render() {
    const { product } = this.props;
    return (
      <div>
        <Card bg="info" text="white" style={{ width: '18rem' }}>
          <Card.Img
            style={{ width: '18rem' }}
            variant="top"
            src={product.imageUrl}
          />
          <Card.Body bg="danger">
            <ul>
              <li>
                {product.manufacturer} {product.name}
              </li>
              <li>Price: ${product.price}</li>
            </ul>

            <Button variant="primary" onClick={() => this.handleClick(product)}>
              Add to Cart
            </Button>
            <select
              name="selectedName"
              value={this.state.selectedNum}
              onChange={this.handleChange}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => {
                return (
                  <option key={number} value={number}>
                    {number}
                  </option>
                );
              })}
            </select>
          </Card.Body>
        </Card>
        <br />
      </div>
    );
  }
}

export default SingleProduct;