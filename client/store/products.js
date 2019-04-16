import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_PRODUCTS = 'SET_PRODUCTS'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const setProduct = product => ({type: SET_PRODUCTS, product})
const removeProduct = () => ({type: REMOVE_PRODUCT})

/**
 * THUNK CREATORS
 */
export const getProduct = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    dispatch(setProduct(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.product
    case REMOVE_PRODUCT:
      return state
    default:
      return state
  }
}
