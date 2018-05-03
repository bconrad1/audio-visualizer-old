import React, {Component} from 'react';
import PropTypes from 'prop-types';

class FileUploader extends Component {

  static propTypes = {
    onClick: PropTypes.func
  };

  render() {
    return (
        <div className={'form-container'}>
          <div className={'sample-btn-container'}>
            <button className={'btn'}>
              {'SAMPLE'}
            </button>
          </div>
          <div className={'chose-btn-container'}>
            <button className={'btn'} onClick={this.props.onClick}>
              {'UPLOAD'}
            </button>
          </div>
        </div>
    );

  }

}

export default FileUploader;

