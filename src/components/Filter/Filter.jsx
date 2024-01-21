import React from 'react';
import propTypes from 'prop-types';

const Filter = ({ value, onChange }) => (
  <div>
    <input
      type="text"
      placeholder="Search by name"
      value={value}
      onChange={onChange}
    />
  </div>
);

Filter.propTypes = {
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
};

export default Filter;