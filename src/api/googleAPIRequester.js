import { getRestaurantId, getRestaurantLocation } from './googleAPIResponseParser';
import { SEARCH_RADIUS_IN_METERS, ERRORS } from '../constants';

const mapElement = document.createElement('div');
mapElement.id = 'map';
const map = new window.google.maps.Map(mapElement);

const placesService = new window.google.maps.places.PlacesService(map);
const distanceService = new window.google.maps.DistanceMatrixService();

const {
  ZERO_RESULTS: PLACES_SERVICE_ZERO_RESULTS,
  OK: PLACES_SERVICE_OK
} = window.google.maps.places.PlacesServiceStatus;
const {
  OK: DISTANCE_SERVICE_OK,
} = window.google.maps.DistanceMatrixStatus;

export const requestNearbyRestaurants = ({ latitude, longitude }) => {
  const options = {
    location: new window.google.maps.LatLng({ lat: latitude, lng: longitude }),
    radius: SEARCH_RADIUS_IN_METERS,
    type: 'restaurant'
  };

  return new Promise((resolve, reject) => {
    placesService.radarSearch(options, (places, status) => {
      if (status === PLACES_SERVICE_ZERO_RESULTS) reject(ERRORS.NO_RESULTS);
      if (status !== PLACES_SERVICE_OK) reject(ERRORS.GENERIC);
      resolve(places);
    });
  });
};

export const requestRestaurantDetails = (restaurant) => {
  const options = {
    placeId: getRestaurantId(restaurant)
  };

  return new Promise((resolve, reject) => {
    placesService.getDetails(options, (place, status) => {
      if (status === PLACES_SERVICE_ZERO_RESULTS) reject(ERRORS.NO_RESULTS);
      if (status !== PLACES_SERVICE_OK) reject(ERRORS.GENERIC);
      resolve(place);
    });
  });
};

export const requestRestaurantDistance = (restaurant, { latitude, longitude }) => {
  const options = {
    origins: [new window.google.maps.LatLng({ lat: latitude, lng: longitude })],
    destinations: [getRestaurantLocation(restaurant)],
    travelMode: 'WALKING'
  };

  return new Promise((resolve, reject) => {
    distanceService.getDistanceMatrix(options, (response, status) => {
      if (status !== DISTANCE_SERVICE_OK) reject(ERRORS.GENERIC);

      const distanceElement = response.rows[0].elements[0];
      if (distanceElement.status !== DISTANCE_SERVICE_OK) reject(ERRORS.GENERIC);
      resolve(distanceElement);
    });
  });
};
