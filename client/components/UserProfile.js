import React from 'react';
import { Card } from 'react-bootstrap';

const UserProfile = ({ firstName, lastName, email }) => {
  return (
    <Card className="profile-container">
      <div className="profile-line">
        <span>Name:</span>
        <span>
          {firstName} {lastName}{' '}
        </span>
      </div>
      <div className="profile-line">
        {' '}
        <span>Email: </span>
        <span>{email} </span>{' '}
      </div>
    </Card>
  );
};

export default UserProfile;
