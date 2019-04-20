import axios from 'axios';
import { TabContainer } from 'react-bootstrap';
/**
 * ACTION TYPES
 */

const ADD_TO_CART = 'ADD_TO_CART';
const UPDATE_CART = 'UPDATE_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

const SUBMIT_CART = 'SUBMIT_CART';

const initialState = {
  cartProducts: [],
  numProducts: 0
};

/**
 * ACTION CREATORS
 */

const addToCart = payload => ({
  type: ADD_TO_CART,
  payload
});

export const editCart = payload => ({
  type: UPDATE_CART,
  payload
});

const submitCart = payload => ({
  type: SUBMIT_CART,
  payload
});

export const addToCartThunk = item => async dispatch => {
  try {
    await axios.post('/api/orders', item);
    dispatch(addToCart(item));
  } catch (error) {
    console.error(error);
  }
};

export const submitCartThunk = items => async dispatch => {
  try {
    const res = await axios.post('/api/orders', items);
    dispatch(submitCart(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const removeFromCart = payload => ({
  type: REMOVE_FROM_CART,
  payload
});

/**
 *
 * REDUCER
 */

export default (state = initialState, action) => {
  let newState = { ...state };
  let altered = false;
  switch (action.type) {
    case ADD_TO_CART:
      newState.cartProducts = newState.cartProducts.map(item => {
        if (item.id === action.payload.product.id) {
          item.desiredQuantity += Number(action.payload.desiredQuantity);
          altered = true;
          return item;
        } else {
          return item;
        }
      });
      if (!altered) {
        const newItem = {
          ...action.payload.product,
          desiredQuantity: action.payload.desiredQuantity
        };
        newState.cartProducts.push(newItem);
      }
      newState.numProducts += action.payload.desiredQuantity;
      return newState;
    case UPDATE_CART:
      newState.cartProducts = newState.cartProducts.map(item => {
        if (item.id === action.payload.product.id) {
          newState.numProducts -= item.desiredQuantity;
          item.desiredQuantity = Number(action.payload.desiredQuantity);
          newState.numProducts += item.desiredQuantity;
          return item;
        } else {
          return item;
        }
      });
      return newState;
    case SUBMIT_CART:
      newState.cartProducts = [];
      newState.numProducts = 0;
      return newState;
    case REMOVE_FROM_CART:
      newState.cartProducts = newState.cartProducts.filter(
        item => item.id !== action.payload.id
      );
      newState.numProducts -= action.payload.desiredQuantity;
      return newState;
    default:
      return state;
  }
};
