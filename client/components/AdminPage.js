import React, { Component } from 'react';
import { GenericProductForm } from './GenericProductForm';
import { connect } from 'react-redux';
import { updateProductThunk, getProduct } from '../store/products';

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
    console.log(event.target.name, event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const productId = this.props.match.params.id;
    console.log(productId);
    this.props.updateOneProduct(productId, this.state);
    this.setState({
      price: ''
    });
  }
  render() {
    const { allProducts } = this.props;
    // console.log('hello', allProducts[this.state.index]);
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
    updateOneProduct: (product, id) => {
      dispatch(updateProductThunk(product, id));
    },
    getAllProducts: () => {
      dispatch(getProduct());
    }
  };
};
export default connect(mapState, mapDispatch)(AdminPage);
