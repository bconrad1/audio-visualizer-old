import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Play from 'react-icons/lib/fa/play-circle';
import Pause from 'react-icons/lib/fa/pause-circle';
import VolumeIcon from 'react-icons/lib/fa/volume-up';

class HeaderPlayBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seeking: false,
      secondsFormatted: this.formatSeconds(this.props.playedSeconds),
      volume: 0.5
    };
  }

  componentWillReceiveProps() {
    this.setState({
      secondsFormatted: this.formatSeconds(this.props.playedSeconds),
    });
  }

  onSeekMouseDown = () => {
    this.setState({seeking: true});
  };

  onSeekChange = e => {
    this.setState({volume: parseFloat(e.target.value)});
    console.log(this.state.volume);
  };

  onSeekMouseUp = e => {
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
    return (
        <div className={'header-container'}>
          <div className={'header-play-bar'}>
            {this.props.playing ? <Pause onClick={this.props.onPlayPause}
                                         className={'play-btn grow'}/> : <Play
                onClick={this.props.onPlayPause} className={'play-btn grow'}/>}
            <input
                className={'seek-input'}
                type='range' min={0} max={1} step='any'
                value={this.props.played}
                onChange={this.props.seek}
                onMouseDown={this.props.seekMouseDown}
                onMouseUp={this.props.seekMouseUp}
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
                  onChange={this.onSeekChange}
                  onMouseDown={this.onSeekMouseDown}
                  onMouseUp={this.onSeekMouseUp}
                  ref={this.ref}
              />
            </div>
          </div>
        </div>

    );
  }
}

HeaderPlayBar.propTypes = {
  onPlayPause: PropTypes.func,
  played: PropTypes.number,
  playedSeconds: PropTypes.number,
  playing: PropTypes.bool,
  seek: PropTypes.func,
  seekMouseDown: PropTypes.func,
  seekMouseUp: PropTypes.func,
};

export default HeaderPlayBar;