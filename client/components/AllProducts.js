import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProduct } from '../store/products';
import { addToCartThunk } from '../store/cart';
import { SingleProduct } from '../components';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      direction: null
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  async componentDidMount() {
    await this.props.getAllProducts();
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }

  render() {
    const { products, addToCart } = this.props;
    const { index, direction } = this.state;

    if (products[0] === undefined) {
      return <h1>Loading</h1>;
    } else {
      return (
        <div id="product-container">
          <Carousel
            id="carousel"
            activeIndex={index}
            direction={direction}
            onSelect={this.handleSelect}
            style={{ width: '65rem' }}
          >
            <Carousel.Item id="transparent">
              <Image
                className="d-block w-100"
                src="https://steemitimages.com/DQmS753qCEwHgqkh77HJ9muSSej5LB1bR5U9Kz8RiLQ229Y/Fender-Stratocaster-Musimaster.jpg"
                alt="First slide"
                style={{ height: '20rem' }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <Image
                className="d-block w-100"
                src="http://lincolnguitarlessons.net/wp-content/uploads/2015/06/martin-left-handed-acoustic-guitars.jpg"
                alt="Third slide"
                style={{ height: '20rem' }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <Image
                className="d-block w-100"
                src="http://www.stringsly.in/wp-content/uploads/2017/04/electric-guitar-brands.jpg"
                alt="Third slide"
                style={{ height: '20rem' }}
              />
            </Carousel.Item>
          </Carousel>
          <div id="products">
            {products.map(product => {
              return (
                product.quantity > 0 && (
                  <SingleProduct
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                  />
                )
              );
            })}
          </div>
        </div>
      );
    }
  }
}

const mapState = state => {
  return {
    products: state.products
  };
};

const mapDispatch = dispatch => {
  return {
    getAllProducts: () => {
      dispatch(getProduct());
    },
    addToCart: product => {
      dispatch(addToCartThunk(product));
    }
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
