/* eslint-disable react/no-unused-prop-types */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import VolumeIcon from 'react-icons/lib/fa/volume-up';

class VolumeBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: 50,
      seeking: false,
    };
  }

  setVolume = () => {
    let audio = document.getElementsByTagName('audio')[0];
  };

  onSeekMouseDown = () => {
    this.setState({seeking: true});
  };
  onSeekChange = e => {
    this.setState({volume: parseFloat(e.target.value)});
  };
  onSeekMouseUp = e => {
    this.setState({seeking: false});
    this.player.seekTo(parseFloat(e.target.value));
  };

  render() {
    return (
        <div className={'volume-container'}>
          <div className={'input-container'}>
            <VolumeIcon className={'volume-icon'}/>
            <div className={'volume-slider-container'}>
              <input className={'volume-slider'} type={'range'} min={'0'}
                     max={'100'}
                     onChange={this.onSeekChange}
                     onMouseDown={this.onSeekMouseUp}
                     onMouseUp={this.onSeekMouseUp}/>
            </div>
          </div>
        </div>
    );
  }
}

VolumeBar.propTypes = {
  volume: PropTypes.number,
};

export default VolumeBar;