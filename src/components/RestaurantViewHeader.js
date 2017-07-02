import React from 'react';
import PropTypes from 'prop-types';

import RatingStars from './RatingStars';

const RestaurantViewHeader = ({ name, rating, photoUrl }) => (
  <div
    className="restaurant__header"
    style={{ backgroundImage: `url(${photoUrl})` }}
  >
    <div
      className="restaurant__header__summary"
    >
      <h1
        className="restaurant__header__summary__title"
      >
        {name}
      </h1>

      { rating &&
        <div
          className="restaurant__header__summary__rating"
        >
          <div
            className="restaurant__header__summary__rating__value"
          >
            {rating.toFixed(1)}
          </div>
          <RatingStars
            className="restaurant__header__summary__rating__stars"
            value={rating}
          />
        </div>
      }
    </div>
  </div>
);

RestaurantViewHeader.defaultProps = {
  photoUrl: 'https://placekitten.com/300/200'
};

RestaurantViewHeader.propTypes = {
  name: PropTypes.string.isRequired,
  rating: PropTypes.number,
  photoUrl: PropTypes.string
}

export default RestaurantViewHeader;
