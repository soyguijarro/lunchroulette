import React from 'react';
import PropTypes from 'prop-types';

function Icon({ name, className }) {
  return (
    <i
      className={`material-icons ${className}`}
    >
      { name }
    </i>
  );
}

Icon.defaultProps = {
  className: ''
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Icon;
