import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Play from 'react-icons/lib/fa/play-circle';
import Pause from 'react-icons/lib/fa/pause-circle';
import VolumeIcon from 'react-icons/lib/fa/volume-up';

class HeaderPlayBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secondsFormatted: this.formatSeconds(this.props.played),
      volume: 0.5,
      played: 0
    };
  }

  componentWillReceiveProps() {
    if (!this.props.seeking) {
      this.setState({
        played: this.props.playedSeconds,
        secondsFormatted: this.formatSeconds(this.props.playedSeconds)
      });
    }
  }

  onVolumeChange = e => {
    this.setState({volume: parseFloat(e.target.value)});
  };

  onVolumeMouseUp = e => {
    let audio = document.getElementsByTagName('audio')[0];
    audio.volume = this.state.volume;
  };

  ref = volumeBar => {
    this.volumeBar = volumeBar;
  };
  formatSeconds = (durationIn) => {
    if (durationIn) {
      let sec = Math.ceil(durationIn);
      let minutes = Math.floor(sec / 60);
      let seconds = sec - (minutes * 60);

      if (minutes < 10) { minutes = '0' + minutes; }
      if (seconds < 10) { seconds = '0' + seconds; }
      return minutes + ':' + seconds;
    }
    return '00:00';
  };

  render() {
    let {duration, playing, onPlayPause, seek, seekMouseDown, seekMouseUp} = this.props;

    return (
        <div className={'header-container'}>
          <div className={`header-play-bar ${playing ? 'header-play-bar-hide' : ''}`}>
            {playing ? <Pause onClick={onPlayPause}
                              className={'play-btn grow'}/> : <Play
                onClick={onPlayPause} className={'play-btn grow'}/>}
            <input
                className={'seek-input'}
                type='range' min={0} max={duration} step='any'
                value={this.state.played}
                onChange={seek}
                onMouseDown={seekMouseDown}
                onMouseUp={seekMouseUp}
            />
            <div className={'seconds-container'}>
              <div
                  className={'seconds-text'}>{this.state.secondsFormatted}</div>
            </div>
            <div className={'volume-container'}>
              <VolumeIcon className={'volume-icon'}/>
              <input
                  className={'seek-input'}
                  type='range' min={0} max={1} step='any'
                  value={this.state.volume}
                  onChange={this.onVolumeChange}
                  onMouseDown={this.onSeekMouseDown}
                  onMouseUp={this.onVolumeMouseUp}
                  ref={this.ref}
              />
            </div>
          </div>
        </div>

    );
  }
}

HeaderPlayBar.propTypes = {
  duration: PropTypes.number,
  onPlayPause: PropTypes.func,
  played: PropTypes.number,
  playedSeconds: PropTypes.number,
  playing: PropTypes.bool,
  seek: PropTypes.func,
  seekMouseDown: PropTypes.func,
  seekMouseUp: PropTypes.func,
  seeking: PropTypes.bool
};

export default HeaderPlayBar;