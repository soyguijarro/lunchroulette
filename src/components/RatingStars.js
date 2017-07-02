import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

import Icon from './Icon';

const Rating = ({ className, value, maxValue }) => {
  const fullStarsNumber = Math.floor(value);
  const isThereHalfStar = value % parseInt(value, 10) >= 0.5;

  const FullStar = <Icon name="star" />;
  const HalfStar = <Icon name="star_half" />;
  const EmptyStar = <Icon name="star_border" />;
  const renderStar = index => {
    if (index < fullStarsNumber) return FullStar;
    if (index < fullStarsNumber + 1 && isThereHalfStar) return HalfStar;
    return EmptyStar;
  }

  return (
    <div
      className={className}
    >
      {
        Array.from(Array(maxValue), (x, i) => (
          cloneElement(renderStar(i), { key: `star-${i + 1}` })
        ))
      }
    </div>
  );
}

Rating.defaultProps = {
  className: '',
  maxValue: 5
};

Rating.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number.isRequired,
  maxValue: (props, propName, componentName) => Number.isInteger(props[propName]) ?
    null : new Error(propName + ' in ' + componentName + ' is not an integer')
};

export default Rating;
