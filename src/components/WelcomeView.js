import React, { PropTypes } from 'react';

import Icon from './Icon';

const WelcomeView = ({ handleStart }) => (
  <main
    className="main simple-view"
  >
    <div
      className="simple-view__content"
    >
      <div
        className="simple-view__title"
      >
        <Icon
          className="simple-view__title__icon"
          name="restaurant"
        />
        <h1
          className="simple-view__title__text"
        >
          Welcome
        </h1>
      </div>

      <div
        className="simple-view__body"
      >
        <p
          className="simple-view__body__text"
        >
          Press below to search for a random restaurant nearby
        </p>

        <button
          className="simple-view__body__button"
          onClick={handleStart}
        >
          I'm feeling lucky
        </button>
      </div>
    </div>

    <a
      className="simple-view__footer"
      href="http://soyguijarro.com"
    >
      Made by @soyguijarro
    </a>
  </main>
);


WelcomeView.propTypes = {
  handleStart: PropTypes.func.isRequired
};

export default WelcomeView;
