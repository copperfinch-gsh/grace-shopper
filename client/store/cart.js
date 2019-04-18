/**
 * ACTION TYPES
 */

const ADD_TO_CART = 'ADD_TO_CART';
const UPDATE_CART = 'UPDATE_CART';

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

/**
 * REDUCER
 */

export default (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case ADD_TO_CART:
      let altered = false;
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
    default:
      return state;
  }
};
