import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

class FileUploader extends Component {
  static propTypes = {
    onSampleClick: PropTypes.func,
    onUploadClick: PropTypes.func
  };

  render() {
    let {onSampleClick, onUploadClick} = this.props;
    return (
        <div className={'form-container'}>
          <div>
            <div className={'btn-container'}>
              <div className={'sample-btn-container'}>
                <label className={'btn'} onClick={onSampleClick}
                       value={'sample'}>
                  {'SAMPLE SONG'}
                </label>
              </div>
              <div className={'diagonal-line'}/>
              <div className={'chose-btn-container'}>
                <input type='file' name='file' id='file' className='inputfile'
                       accept='.mp3' onChange={onUploadClick}/>
                <label htmlFor='file' className={'btn'}>{'UPLOAD SONG'}</label>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default FileUploader;

