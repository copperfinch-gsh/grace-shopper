import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const SET_PRODUCTS = 'SET_PRODUCTS';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

/**
 * INITIAL STATE
 */
const initialState = [];

/**
 * ACTION CREATORS
 */
const setProduct = product => ({ type: SET_PRODUCTS, product });
const removeProduct = id => ({ type: REMOVE_PRODUCT, id });
const updateProduct = data => ({ type: UPDATE_PRODUCT, payload: data });

/**
 * THUNK CREATORS
 */
export const getProduct = () => async dispatch => {
  try {
    const res = await axios.get('/api/products');
    dispatch(setProduct(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const updateProductThunk = (id, price) => {
  return async dispatch => {
    try {
      const { data } = await axios.put(`/api/products/${id}`, price);
      dispatch(updateProduct(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const removeProductThunk = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/products/${id}`);
    dispatch(removeProduct(id));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  // console.log(action.payload);
  let newState = [...state];
  switch (action.type) {
    case SET_PRODUCTS:
      return action.product;
    case REMOVE_PRODUCT:
      newState = newState.filter(product => product.id !== action.id);
      return newState;
    case UPDATE_PRODUCT:
      newState = newState.map(product => {
        if (product.id === action.payload.id) {
          return action.payload;
        } else {
          return product;
        }
      });
      return newState;
    default:
      return state;
  }
}
