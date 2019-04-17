/**
 * ACTION TYPES
 */

const UPDATE_CART = 'UPDATE_CART';

const initialState = [];

/**
 * ACTION CREATORS
 */

export const updateCart = payload => ({
  type: UPDATE_CART,
  payload
});

/**
 * REDUCER
 */

export default (state = initialState, action) => {
  let newState = [...state];
  switch (action.type) {
    case UPDATE_CART:
      let altered = false;
      newState = newState.map(item => {
        if (item.id === action.payload.product.id) {
          item.desiredQuantity += Number(action.payload.desiredQuantity);
          console.log(item.desiredQuantity, 'desired quantity');
          //price needs to be adjusted here
          altered = true;
          return item;
        } else {
          return item;
        }
      });
      if (!altered) {
        const updatedItem = {
          ...action.payload.product,
          desiredQuantity: action.payload.desiredQuantity
          //price needs to be adjusted here
        };
        newState.push(updatedItem);
      }
      return newState;
    default:
      return state;
  }
};
