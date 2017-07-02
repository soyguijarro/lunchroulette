import React from 'react';
import PropTypes from 'prop-types';

import RestaurantViewHeader from './RestaurantViewHeader';
import RestaurantViewDetails from './RestaurantViewDetails';

import fallbackPhotoUrl from '../images/fallback-photo.png'

const RestaurantView = ({
  name, rating, photoUrl, address, phone, websiteUrl, googlePageUrl,
  distanceInSpace, distanceInTime
}) => (
  <main
    className="main restaurant"
  >
    <RestaurantViewHeader
      name={name}
      rating={rating}
      photoUrl={photoUrl}
    />
    <RestaurantViewDetails
      address={address}
      phone={phone}
      distanceInSpace={distanceInSpace}
      distanceInTime={distanceInTime}
      websiteUrl={websiteUrl}
      googlePageUrl={googlePageUrl}
    />
  </main>
);

RestaurantView.defaultProps = {
  photoUrl: fallbackPhotoUrl
};

RestaurantView.propTypes = {
  name: PropTypes.string.isRequired,
  rating: PropTypes.number,
  photoUrl: PropTypes.string,
  address: PropTypes.string.isRequired,
  phone: PropTypes.string,
  websiteUrl: PropTypes.string,
  googlePageUrl: PropTypes.string.isRequired,
  distanceInSpace: PropTypes.string,
  distanceInTime: PropTypes.string
};

export default RestaurantView;
