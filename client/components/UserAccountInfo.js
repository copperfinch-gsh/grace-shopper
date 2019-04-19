import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const UserAccountInfo = props => {
  const { firstName } = props.user;

  return (
    <div>
      <h3>Welcome {firstName}!</h3>
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

export default connect(mapState)(UserAccountInfo);

/**
 * PROP TYPES
 */
UserAccountInfo.propTypes = {
  user: PropTypes.object
};
