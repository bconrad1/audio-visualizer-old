/* eslint-disable react/no-unused-prop-types */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class VolumeBar extends Component {

  render() {
    return (
        <div className={'volume-container'}>
          <span/>
        </div>
    );
  }
}

VolumeBar.propTypes = {
  volume: PropTypes.number
};

export default VolumeBar;