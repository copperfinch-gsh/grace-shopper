import React, {Component} from 'react'

const sampleCart = [
  {id: 1, name: 'Strat', imageUrl: '', price: 20, quantity: 1}
]

export default class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: sampleCart
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <style jsx>{`
          h3 {
            color: green;
          }
        `}</style>
        <h3>Shopping Cart:</h3>
        {this.state.cart.map(item => {
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
}
