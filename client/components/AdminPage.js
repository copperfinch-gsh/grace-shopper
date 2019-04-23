import React, { Component } from 'react';
import { GenericProductForm } from './GenericProductForm';
import { connect } from 'react-redux';
import {
  updateProductThunk,
  getProduct,
  removeProductThunk
} from '../store/products';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      index: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    await this.props.getAllProducts();
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateOneProduct(
      this.props.allProducts[this.state.index].id,
      this.state.price
    );
  }
  render() {
    const { allProducts, removeProduct } = this.props;
    return (
      <div>
        <h2 id="title-color">Modify Product Info</h2>
        <select name="index" onChange={this.handleChange}>
          {allProducts.map((product, index) => {
            return (
              <option key={product.id} value={index}>
                {product.name}
              </option>
            );
          })}
        </select>
        {allProducts[this.state.index] && (
          <GenericProductForm
            item={allProducts[this.state.index]}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            deleteItem={removeProduct}
            price={this.state.price}
          />
        )}
      </div>
    );
  }
}

const mapState = state => {
  return {
    allProducts: state.products
  };
};

const mapDispatch = dispatch => {
  return {
    updateOneProduct: (id, price) => {
      dispatch(updateProductThunk(id, { price }));
    },
    getAllProducts: () => {
      dispatch(getProduct());
    },
    removeProduct: id => {
      dispatch(removeProductThunk(id));
    }
  };
};
export default connect(mapState, mapDispatch)(AdminPage);
