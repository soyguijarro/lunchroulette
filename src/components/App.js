import React, { Component } from 'react';

import Header from './Header';
import WelcomeView from './WelcomeView';
import RestaurantView from './RestaurantView';
import LoadingView from './LoadingView';
import ErrorView from './ErrorView';

import getRandomItemFromArray from '../utils/getRandomItemFromArray';
import requestCurrentLocation from '../utils/requestCurrentLocation';
import {
  getRestaurantId,
  parseRestaurantData,
  parseDistanceData
} from '../api/googleAPIResponseParser';
import {
  requestNearbyRestaurants,
  requestRestaurantDetails,
  requestRestaurantDistance
} from '../api/googleAPIRequester';
import { ERRORS } from '../constants';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isGenericError: false,
      isLocationError: false,
      isGettingLocation: false,
      isFetchingData: false,
      areNoResults: false,
      restaurant: null
    };

    this.checkIfCurrentRestaurant = this.checkIfCurrentRestaurant.bind(this);
    this.requestRandomRestaurant = this.requestRandomRestaurant.bind(this);
    this.getRandomRestaurantNearby = this.getRandomRestaurantNearby.bind(this);
  }

  setRestaurantData(restaurant, distance) {
    this.setState({
      restaurant: {
        ...parseRestaurantData(restaurant),
        ...parseDistanceData(distance)
      },
      isFetchingData: false
    });
  }

  checkIfCurrentRestaurant(restaurant) {
    const { restaurant: currentRestaurant } = this.state;

    const isCurrentRestaurant = currentRestaurant &&
      getRestaurantId(restaurant) === currentRestaurant.id;

    if (isCurrentRestaurant) return Promise.reject(ERRORS.SEARCH_AGAIN);
    return restaurant;
  }

  requestRandomRestaurant(coordinates) {
    this.setState({
      isGettingLocation: false,
      isFetchingData: true,
      areNoResults: false
    });

    requestNearbyRestaurants(coordinates)
      .then(getRandomItemFromArray)
      .then(this.checkIfCurrentRestaurant)
      .then(requestRestaurantDetails)
      .then(restaurant => Promise.all([
        restaurant, requestRestaurantDistance(restaurant, coordinates)
      ]))
      .then(data => this.setRestaurantData(...data))
      .catch(error => {
        if (error === ERRORS.SEARCH_AGAIN) {
          return this.getRandomRestaurantNearby();
        }

        if (error === ERRORS.NO_RESULTS) {
          return this.setState({
            isFetchingData: false,
            areNoResults: true
          })
        }

        this.setState({
          isFetchingData: false,
          isGenericError: true
        });
      });
  }

  getRandomRestaurantNearby() {
    this.setState({
      isGenericError: false,
      isLocationError: false,
      isGettingLocation: true
    });

    requestCurrentLocation()
      .then(this.requestRandomRestaurant)
      .catch(() => {
        this.setState({
          isGettingLocation: false,
          isLocationError: true
        })
      });
  }

  getCurrentView() {
    const {
      isGenericError, isLocationError, areNoResults, isFetchingData, isGettingLocation, restaurant
    } = this.state;

    if (isGenericError) {
      return (
        <ErrorView
          iconName="error"
          title="Unknown error"
          text="Something went wrong, please try again"
        />
      );
    }

    if (isLocationError) {
      return (
        <ErrorView
          iconName="location_off"
          title="No location"
          text="We couldn't get your position, please make sure you turned location on"
        />
      );
    }

    if (isGettingLocation) {
      return (
        <LoadingView
          iconName="location_on"
        />
      );
    }

    if (areNoResults) {
      return (
        <ErrorView
          iconName="explore"
          title="No results"
          text="Sorry, there are no restaurants nearby"
        />
      );
    }

    if (isFetchingData) {
      return (
        <LoadingView
          iconName="search"
        />
      );
    }

    if (restaurant) {
      return (
        <RestaurantView
          {...restaurant}
        />
      );
    }

    return (
      <WelcomeView
        handleStart={this.getRandomRestaurantNearby}
      />
    );
  }

  render() {
    const {
      restaurant, isFetchingData, isGettingLocation, isLocationError, areNoResults
    } = this.state;

    return (
      <div
        className="app"
      >
        <Header
          showRefreshButton={
            (!!restaurant && !isFetchingData && !isGettingLocation) ||
            areNoResults || isLocationError
          }
          handleRefresh={this.getRandomRestaurantNearby}
        />

        {this.getCurrentView()}
      </div>
    );
  }
}

export default App;
