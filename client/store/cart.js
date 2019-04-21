import axios from 'axios';
/**
 * ACTION TYPES
 */

const ADD_TO_CART = 'ADD_TO_CART';
const EDIT_CART = 'EDIT_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const GET_CART = 'GET_CART';
const SUBMIT_CART = 'SUBMIT_CART';

const initialState = {
  cartProducts: [],
  numProducts: 0
};

/**
 * ACTION CREATORS
 */

const getCart = payload => ({
  type: GET_CART,
  payload
});

const addToCart = payload => ({
  type: ADD_TO_CART,
  payload
});

const editCart = payload => ({
  type: EDIT_CART,
  payload
});

export const submitCart = () => ({
  type: SUBMIT_CART
});

const removeFromCart = payload => ({
  type: REMOVE_FROM_CART,
  payload
});

export const editCartThunk = productData => async dispatch => {
  try {
    const res = await axios.put('/api/cart', productData);
    dispatch(editCart(res.data));
  } catch (error) {
    console.error(error);
  }
};

export const removeFromCartThunk = product => async dispatch => {
  try {
    const res = await axios.put('/api/cart', product);
    dispatch(removeFromCart(res.data));
  } catch (error) {
    console.error(error);
  }
};

export const getCartThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/cart');
    dispatch(getCart(res.data));
  } catch (error) {
    console.error(error);
  }
};

export const addToCartThunk = item => async dispatch => {
  try {
    await axios.post('/api/orders', item);
    dispatch(addToCart(item));
  } catch (error) {
    console.error(error);
  }
};

export const submitCartThunk = () => async dispatch => {
  try {
    console.log('in thunk:');
    await axios.put('/api/orders/checkout');
    dispatch(submitCart());
  } catch (err) {
    console.error(err);
  }
};

/**
 *
 * REDUCER
 */

export default (state = initialState, action) => {
  let newState = { ...state };
  let altered = false;
  switch (action.type) {
    case GET_CART:
      newState.cartProducts = action.payload.cartProducts;
      newState.numProducts = action.payload.numProducts;
      return newState;
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
    case EDIT_CART:
      newState.cartProducts = newState.cartProducts.map(item => {
        if (item.id === action.payload.id) {
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
