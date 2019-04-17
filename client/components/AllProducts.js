import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProduct } from '../store/products';
import { updateCart } from '../store/cart';
import SingleProduct from './SingleProduct';

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNum: 1
    };
  }

  async componentDidMount() {
    await this.props.getAllProducts();
  }

  render() {
    console.log('render');
    const { products, addToCart } = this.props;
    return (
      <div>
        {products.map(product => (
          <SingleProduct
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    );
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
      dispatch(updateCart(product));
    }
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
