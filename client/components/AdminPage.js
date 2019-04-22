import React, { Component } from 'react';
import { GenericProductForm } from './GenericProductForm';
import { connect } from 'react-redux';
import { updateProductThunk, getProduct } from '../store/products';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0
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
    const productId = this.props.match.params.id;
    this.props.updateOneProduct(productId, this.state);
    this.setState({
      price: ''
    });
  }
  render() {
    const { allProducts } = this.props;
    return (
      <div>
        <h2>Modify Product Info</h2>
        <GenericProductForm
          {...this.state}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          products={allProducts}
        />
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
