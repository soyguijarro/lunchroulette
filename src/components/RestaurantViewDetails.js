import React from 'react';
import PropTypes from 'prop-types';

import Icon from './Icon';

const RestaurantViewDetails = ({
  address, phone, websiteUrl, googlePageUrl, distanceInTime, distanceInSpace
}) => (
  <div
    className="restaurant__details"
  >
    <div
      className="restaurant__details--top"
    >
      <div
        className="restaurant__details__item"
      >
        <Icon
          className="restaurant__details__item__icon"
          name="location_on"
        />
        <div
          className="restaurant__details__item__text"
        >
          {address}
        </div>
      </div>

      { phone &&
        <div
          className="restaurant__details__item"
        >
          <Icon
            className="restaurant__details__item__icon"
            name="phone"
          />
          <a
            className="restaurant__details__item__text"
            href={`tel:${phone.replace(/ /g,'')}`}
          >
            {phone}
          </a>
        </div>
      }

      { websiteUrl &&
        <div
          className="restaurant__details__item"
        >
          <Icon
            className="restaurant__details__item__icon"
            name="link"
          />
          <a
            className="restaurant__details__item__text"
            href={websiteUrl}
          >
            {websiteUrl}
          </a>
        </div>
      }
    </div>

    { distanceInTime && distanceInSpace &&
      <a
        className="restaurant__details--bottom"
        href={googlePageUrl}
      >
        <div
          className="restaurant__details__item"
        >
          <Icon
            className="restaurant__details__item__icon"
            name="directions_walk"
          />
          <div
            className="restaurant__details__item__text"
          >
            {distanceInTime} ({distanceInSpace})
          </div>
        </div>
      </a>
    }
  </div>
);

RestaurantViewDetails.propTypes = {
  address: PropTypes.string.isRequired,
  phone: PropTypes.string,
  websiteUrl: PropTypes.string,
  googlePageUrl: PropTypes.string.isRequired,
  distanceInTime: PropTypes.string,
  distanceInSpace: PropTypes.string
}

export default RestaurantViewDetails;
