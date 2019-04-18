import axios from 'axios';
/**
 * ACTION TYPES
 */

const ADD_TO_CART = 'ADD_TO_CART';
const UPDATE_CART = 'UPDATE_CART';

const SUBMIT_CART = 'SUBMIT_CART';

const initialState = {
  cartProducts: [],
  numProducts: 0
};

/**
 * ACTION CREATORS
 */

export const setCart = payload => ({
  type: ADD_TO_CART,
  payload
});

export const editCart = payload => ({
  type: UPDATE_CART,
  payload
});

const sendCart = payload => ({
  type: SUBMIT_CART,
  payload
});

export const sendCartThunk = items => async dispatch => {
  try {
    const res = await axios.post('/api/orders', items);
    console.log(res);
    dispatch(sendCart(res.data));
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
    default:
      return state;
  }
};
