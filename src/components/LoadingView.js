import React, { PropTypes } from 'react';

import Icon from './Icon';

const LoadingView = ({ iconName }) => (
  <main
    className="main loading"
  >
    <Icon
      className="loading__icon"
      name={ iconName }
    />
  </main>
);

LoadingView.propTypes = {
  iconName: PropTypes.string.isRequired
};

export default LoadingView;
