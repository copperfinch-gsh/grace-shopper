import React from 'react';

export const GenericProductForm = props => {
  const { price, handleChange, handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="price" />
      Enter New Price
      <label />
      <input type="text" name="price" value={price} onChange={handleChange} />
      <button id="submitButton" type="submit">
        Submit
      </button>
    </form>
  );
};
