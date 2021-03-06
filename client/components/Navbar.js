import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, submitCart } from '../store';

const Navbar = ({ handleClick, isLoggedIn, cart, user, isAdmin }) => (
  <div id="nav">
    <Link id="grace" to="/">
      {' '}
      GRACE SHREDDER
    </Link>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}

          <a className="links" href="#" onClick={handleClick}>
            Logout
          </a>
          <Link className="links" to="/cart">
            Cart({cart.numProducts})
          </Link>
          <Link className="links" to="/home">
            Welcome {user.firstName} <i className="fas fa-guitar" />
          </Link>
          {isAdmin && (
            <Link className="links" to="/admin">
              Admin Page
            </Link>
          )}
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link className="links" to="/login">
            Login
          </Link>
          <Link className="links" to="/signup">
            Sign Up
          </Link>
          <Link className="links" to="/cart">
            Cart({cart.numProducts})
          </Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart,
    user: state.user,
    isAdmin: state.user.isAdmin
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
      dispatch(submitCart());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
