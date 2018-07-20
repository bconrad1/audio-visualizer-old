import React from 'react';
import BackButton from './back-button';
import PropTypes from 'prop-types';

export const Footer = ({onBackClick, selectionMade}) => {
  return (
      <div>
        {selectionMade && <BackButton onBackClick={onBackClick}/>}
        <div className={'sample-song-container footer-link'}>
          <a href='http://www.hooksounds.com' target={'#'}
             className={'footer-link grow'}>{'Music by HookSounds'}</a>
        </div>
        <div className={'github-container'}>
          <a href={'https://github.com/bconrad1'} target={'#'}
             className={'footer-link grow'}>{'GitHub.com'}</a>
        </div>
      </div>
  );
};

Footer.propTypes = {
  onBackClick: PropTypes.func,
  selectionMade: PropTypes.bool
};