import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../store';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';

/**
 * COMPONENT
 */
const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;

  if (error) {
    console.log('ERRRROOORRR', error.response);
  }

  return (
    <div>
      <CardDeck style={{ width: '40rem' }}>
        <Card id="card">
          <Card.Body>
            <Card.Title id="title-color">Please {displayName}</Card.Title>
            <Card.Text>
              <form onSubmit={handleSubmit} name={name}>
                <div>
                  <label htmlFor="email">
                    <small id="email">Email:</small>
                  </label>
                  <input name="email" type="email" required />
                </div>
                <div>
                  <label htmlFor="password">
                    <small id="password">Password:</small>
                  </label>
                  <input name="password" type="password" required />
                </div>
                <div>
                  <button id="login" type="submit">
                    {displayName}
                  </button>
                </div>
              </form>
            </Card.Text>
          </Card.Body>
        </Card>
        <div className="wrapper">
          <div className="line" />
          <div className="wordwrapper">
            <div className="word">or</div>
          </div>
        </div>​
        <Card id="card">
          <Card.Body id="google">
            <Card.Text>
              {' '}
              <form onSubmit={handleSubmit} name={name}>
                {error &&
                  error.response && (
                    <div id="error-message"> {error.response.data} </div>
                  )}
                <button
                  type="submit"
                  href="/auth/google"
                  className="loginBtn loginBtn--google"
                >
                  <a href="/auth/google">{displayName} with Google</a>
                </button>
              </form>
            </Card.Text>
          </Card.Body>
        </Card>
      </CardDeck>;
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  };
};

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName));
    }
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};
