import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Login, Signup, Cart, UserAccountInfo } from './components';
import AllProducts from './components/AllProducts';
import { me, getCartThunk } from './store';
import AdminPage from './components/AdminPage'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
    this.props.loadCart();
  }

  componentDidUpdate(prevState, prevProps) {
    //if logging in, load the logged in user's cart
    if (!prevState.isLoggedIn && this.props.isLoggedIn) {
      this.props.loadCart();
    }
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Switch>
        <Route exact path="/" component={AllProducts} />
        <Route exact path="/cart" component={Cart} />
        <Route path="/home" component={UserAccountInfo} />
        <Route path="/edit" component={AdminPage} />

        <Route path="/products" component={AllProducts} />
        {isLoggedIn ? (
          <div>
            <Redirect from="/login" to="/" />
          </div>
        ) : (
          <div>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </div>
        )}
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    },
    loadCart() {
      dispatch(getCartThunk());
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
