import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OrderHistory from './OrderHistory';
import UserProfile from './UserProfile';
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
  const [profDisplay, setProfDisplay] = useState(true);

  useEffect(() => {
    async function orderFetch() {
      await props.getOrders(id);
    }
    orderFetch();
  });

  return (
    <div>
      <h3>Welcome {firstName}!</h3>
      <div>
        <div
          className={profDisplay ? 'active' : ''}
          onClick={() => setProfDisplay(true)}
        >
          User Profile
        </div>
        <div
          className={!profDisplay ? 'active' : ''}
          onClick={() => setProfDisplay(false)}
        >
          Order History
        </div>
      </div>
      {profDisplay ? <UserProfile /> : <OrderHistory history={props.history} />}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    history: state.history
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

// <NavLink
// to="/home/orderhistory"
// activeClassName="selected"
// onClick={() => props.getOrders(id)}
// >
// Order History
// </NavLink>

// <Router>
// <Switch>
//   <Route exact path="/home/orderhistory" component={OrderHistory} />
//   {/* <Route path="/userprofile" component={} /> */}
// </Switch>
// </Router>
