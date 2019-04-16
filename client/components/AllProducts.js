import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProduct} from '../store/products'
import {Button} from 'react-bootstrap'
import Card from 'react-bootstrap/Card'

class AllProducts extends Component {
  async componentDidMount() {
    await this.props.getAllProducts()
  }
  render() {
    const {products} = this.props

    return (
      <div>
        {products.map(product => (
          <div key={product.id}>
            <Card bg="info" text="white" style={{width: '18rem'}}>
              <Card.Img
                style={{width: '18rem'}}
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

                <Button variant="primary">Add to Cart</Button>
              </Card.Body>
            </Card>
            <br />
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    getAllProducts: () => {
      dispatch(getProduct())
    }
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
