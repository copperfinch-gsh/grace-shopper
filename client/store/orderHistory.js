import axios from 'axios';

/**
 * ACTION TYPES
 */
const SET_HISTORY = 'SET_HISTORY';

/**
 * INITIAL STATE
 */
const defaultHistory = [];

/**
 * ACTION CREATORS
 */
const setHistory = payload => ({ type: SET_HISTORY, payload });

/**
 * THUNK CREATORS
 */
export const getHistoryThunk = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}/orders`);
    console.log('order stuff:', res.data);
    dispatch(setHistory(res.data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultHistory, action) {
  const newState = [];
  switch (action.type) {
    case SET_HISTORY:
      action.payload.forEach(orderObj => {
        const order = { id: orderObj.id, products: [] };

        orderObj.products.forEach(prod => {
          const singleProd = {
            name: prod.name,
            color: prod.color,
            manufacturer: prod.manufacturer,
            price: prod.lineItem.unitPrice,
            quantity: prod.lineItem.quantity
          };
          order.products.push(singleProd);
        });

        newState.push(order);
      });
      return newState;
    default:
      return state;
  }
}
