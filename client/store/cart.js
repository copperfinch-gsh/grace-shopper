/**
 * ACTION TYPES
 */

const UPDATE_CART = 'UPDATE_CART'

const initialState = []

/**
 * ACTION CREATORS
 */

const updateCart = payload => ({
  type: UPDATE_CART,
  payload
})

/**
 * REDUCER
 */

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CART:
      return [...state, action.payload]
    default:
      return state
  }
}
