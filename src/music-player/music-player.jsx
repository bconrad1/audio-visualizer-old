import React, {Component, Fragment} from 'react';
import '../static/styles/appStyle.scss';
import ReactPlayer from 'react-player';
import TestSong from '../static/walkonby.mp3';
import TestSong2 from '../static/jungle.mp3';
import TestSong3 from '../static/test3.mp3';
import HeaderPlayBar from './header-play-bar/header-play-bar';
import Visualizer from '../visualizer/visualizer';

class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      duration: 0,
      played: 0,
      seeking: false,
      currentVis: 'circle'
    };
  }

  onPlayPause = () => {
    this.setState({
      playing: !this.state.playing
    });
  };

  onSeekMouseDown = () => {
    this.setState({seeking: true});
  };
  onSeekChange = e => {
    this.setState({played: parseFloat(e.target.value)});
  };
  onSeekMouseUp = e => {
    this.setState({seeking: false});
    this.player.seekTo(parseFloat(e.target.value));
  };

  onDuration = (duration) => {
    this.setState({duration});
  };

  onChangeVis = () => {
    this.setState({
      currentVis: this.state.currentVis === 'circle' ? 'bars' : 'circle'
    });
    console.log('newVis', this.state.currentVis);
  };

  onProgress = state => {
    if (!this.state.seeking) {
      this.setState({
        played: state.played,
        playedSeconds: state.playedSeconds,
        seeking: false
      });
    }
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

    return (
        <Fragment>
          <HeaderPlayBar onPlayPause={playPause}
                         onVisChange={visChanged}
                         currentVis={this.state.currentVis}
                         seek={seek}
                         playing={this.state.playing}
                         played={this.state.played}
                         playedSeconds={this.state.playedSeconds}
                         seekMouseDown={seekDown}
                         seekMouseUp={seekUp}/>
          <div className='music-player-wrapper'>
            <ReactPlayer
                url={TestSong3}
                playing={this.state.playing}
                onDuration={this.onDuration}
                onSeek={e => null}
                onProgress={this.onProgress}
                ref={this.ref}
            />
          </div>
          <Visualizer currentVis={this.state.currentVis}/>
        </Fragment>
    );
  }
}

export default MusicPlayer;
