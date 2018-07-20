import React from 'react';
import BackIcon from 'react-icons/lib/fa/arrow-circle-left';
import PropTypes from 'prop-types';

const BackButton = ({onBackClick}) => {
  return (
      (
          <div className={'back-btn-container'}>
            <BackIcon onClick={onBackClick} className={'back-btn grow'}/>
          </div>
      )
  );
};

export default BackButton;

BackButton.propTypes = {
  onBackClick: PropTypes.func
};