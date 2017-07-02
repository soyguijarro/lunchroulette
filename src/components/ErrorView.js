import React from 'react';
import PropTypes from 'prop-types';

import Icon from './Icon';

const ErrorView = ({ iconName, title, text }) => (
  <main
    className="main simple-view"
  >
    <div
      className="simple-view__title"
    >
      <Icon
        className="simple-view__title__icon"
        name={iconName}
      />
      <h1
        className="simple-view__title__text"
      >
        {title}
      </h1>
    </div>

    <div
      className="simple-view__body"
    >
      <p
        className="simple-view__body__text"
      >
        {text}
      </p>
    </div>
  </main>
);

ErrorView.propTypes = {
  iconName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default ErrorView;
