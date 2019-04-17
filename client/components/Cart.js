import React from 'react'
import {connect} from 'react-redux'

const Cart = ({cartItems}) => {
  return (
    <div className="container-fluid">
      <style jsx>{`
        h3 {
          color: green;
        }
      `}</style>
      <h3>Shopping Cart:</h3>
      {cartItems.map(item => {
        return (
          <div key={item.id}>
            <div>
              {' '}
              <img src={item.imageUrl} alt="item image" />{' '}
            </div>
            <div> name: {item.name} </div>
            <div> price: {item.price} </div>
            <div>
              {' '}
              <select>
                <option value="1" selected>
                  1
                </option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>{' '}
            </div>
          </div>
        )
      })}
    </div>
  )
}

const mapStateToProps = state => ({
  cartItems: state.cart
})

export default connect(mapStateToProps)(Cart)
