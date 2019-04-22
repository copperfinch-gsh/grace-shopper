import React, { Component } from 'react';
import { GenericProductForm } from './GenericProductForm';
import { connect } from 'react-redux';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      price: '',
    });
  }
  render() {
    const { products } = this.props.allProducts;
    return (
      <div>
        <h2>Modify Product Info</h2>
        <GenericProductForm
          {...this.state}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          products = {products}
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
export default connect(mapState)(AdminPage);
