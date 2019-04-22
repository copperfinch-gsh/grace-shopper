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
const removeProduct = () => ({ type: REMOVE_PRODUCT });
const updateProduct = (product, id) => ({ type: UPDATE_PRODUCT, product, id });

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

export const updateProductThunk = (productToUpdate, id) => {
  return async dispatch => {
    try {
      const { data } = await axios.put(`/api/products/${id}`, productToUpdate);
      dispatch(updateProduct(data));
    } catch (err) {
      console.error(err);
    }
  };
};

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.product;
    case REMOVE_PRODUCT:
      return state;
    case UPDATE_PRODUCT:
      let copyOfProducts = [...state];
      let productToUpdate = copyOfProducts.filter(
        product => product.id === action.id
      );
      productToUpdate = action.product;
      return productToUpdate;
    default:
      return state;
  }
}
