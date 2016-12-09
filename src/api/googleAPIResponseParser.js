import { MAX_PHOTO_WIDTH_IN_PX } from '../constants';

export const getRestaurantId = restaurant => restaurant.place_id;

export const getRestaurantLocation = restaurant => restaurant.geometry.location;

const getRestaurantPhotoUrl = (restaurant) => {
  const { photos } = restaurant;

  if (!photos || !photos.length) return undefined;

  const options = {
    maxWidth: Math.min(window.innerWidth, MAX_PHOTO_WIDTH_IN_PX)
  };
  return photos[0].getUrl(options);
};

export const parseRestaurantData = restaurant => ({
  id: getRestaurantId(restaurant),
  name: restaurant.name,
  address: restaurant.vicinity,
  rating: restaurant.rating,
  photoUrl: getRestaurantPhotoUrl(restaurant),
  phone: restaurant.formatted_phone_number,
  websiteUrl: restaurant.website,
  googlePageUrl: restaurant.url
});

export const parseDistanceData = ({ distance, duration }) => ({
  distanceInSpace: distance.text,
  distanceInTime: duration.text
});
