import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OrderHistory from './OrderHistory';
import { getHistoryThunk } from '../store/orderHistory';
import {
  Switch,
  Route,
  NavLink,
  BrowserRouter as Router
} from 'react-router-dom';

/**
 * COMPONENT
 */
export const UserAccountInfo = props => {
  const { firstName, id } = props.user;

  return (
    <div>
      <h3>Welcome {firstName}!</h3>
      <NavLink
        to="/home/orderhistory"
        activeClassName="selected"
        onClick={() => props.getOrders(id)}
      >
        Order History
      </NavLink>

      <Router>
        <Switch>
          <Route exact path="/home/orderhistory" component={OrderHistory} />
          {/* <Route path="/userprofile" component={} /> */}
        </Switch>
      </Router>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  };
};

const mapDispatch = dispatch => ({
  getOrders: id => dispatch(getHistoryThunk(id))
});

export default connect(mapState, mapDispatch)(UserAccountInfo);

/**
 * PROP TYPES
 */
UserAccountInfo.propTypes = {
  user: PropTypes.object
};
