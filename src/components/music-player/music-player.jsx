import React, {Component, Fragment} from 'react';
import '../../static/styles/appStyle.scss';
import PropTypes from 'prop-types';
import HeaderPlayBar from './header-play-bar/header-play-bar';
import Visualizer from '../visualizer/visualizer';

import SampleSong from '../../static/dream-adventure.mp3';

class MusicPlayer extends Component {
  static propTypes = {
    songs: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      playing: true,
      duration: 0,
      played: 0,
      seeking: false,
      volume: 1,
      currentVis: 'circle'
    };

    this.setState.bind(this);
  }

  componentDidMount() {
    this.initAudio();
  }

  initAudio = () => {
    let audio = this.player;
    let files = this.props.songs;

    if (files) {
      audio.src = URL.createObjectURL(this.props.songs[0]);
    } else {
      audio.src = SampleSong;
    }

    audio.addEventListener('timeupdate', () => {
      this.setState({played: audio.currentTime});
    });

    audio.onloadedmetadata = () => {
      audio.play();
      this.setState({playing: true, duration: this.player.duration});
    };
  };

  onPlayPause = () => {
    console.log(this.player.duration);
    if (this.state.playing) {
      this.player.pause();
      this.setState({playing: false});
    } else {
      this.player.play();
      this.setState({playing: true});
    }
  };

  onSeekMouseDown = () => {
    this.setState({seeking: true});
  };

  onSeekChange = e => {
    this.setState({played: parseFloat(e.target.value)});
  };

  onSeekMouseUp = () => {
    this.player.currentTime = this.state.played;
    console.log(this.state.played);
    console.log(this.state.duration);
    this.setState({seeking: false});
  };

  onChangeVis = () => {
    this.setState({
      currentVis: this.state.currentVis === 'circle' ? 'bars' : 'circle'
    });
  };

  ref = player => {
    this.player = player;
  };

  render() {
    let playPause = this.onPlayPause.bind(this);
    let seek = this.onSeekChange.bind(this);
    let seekUp = this.onSeekMouseUp.bind(this);
    let seekDown = this.onSeekMouseDown.bind(this);
    let visChanged = this.onChangeVis.bind(this);
    let currentTime = this.state.played;
    return (
        <Fragment>
          <HeaderPlayBar onPlayPause={playPause}
                         onVisChange={visChanged}
                         currentVis={this.state.currentVis}
                         seek={seek}
                         seeking={this.state.seeking}
                         duration={this.state.duration}
                         playing={this.state.playing}
                         playedSeconds={currentTime}
                         seekMouseDown={seekDown}
                         seekMouseUp={seekUp}/>
          <div className='music-player-wrapper'>
            <audio id='audio' controls ref={this.ref}
                   ontimeupdate={this.onAudioChange} loop/>
          </div>
          <Visualizer currentVis={this.state.currentVis}
                      songs={this.props.songs}/>
        </Fragment>
    );
  }
}

export default MusicPlayer;

