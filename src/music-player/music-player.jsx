import React, {Component, Fragment} from 'react';
import '../appStyle.css';
import ReactPlayer from 'react-player';
import TestSong from '../static/walkonby.mp3';
import TestSong2 from '../static/jungle.mp3';
import HeaderPlayBar from '../header-play-bar/header-play-bar';

class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 1,
      playing: false,
      duration: 0,
      played: 0
    };

    this.audioRef = React.createRef();
    this.canvasRef = React.createRef();
    this.initVisualization = this.initVisualization.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.initVisualization();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  };

  onPlayPause = () => {
    this.setState({
      playing: !this.state.playing
    });
  };

  onSeekChange = e => {
    this.setState({played: parseFloat(e.target.value)});
  };

  onDuration = (duration) => {
    console.log('onDuration', duration);
    this.setState({duration});
  };

  onProgress = state => {
    this.setState({
      played: state.playedSeconds
    });
  };

  initVisualization = () => {
    let context = new AudioContext();
    let analyser = context.createAnalyser();
    let canvas = this.canvasRef.current;
    let ctx = canvas.getContext('2d');

    //let audio = this.audioRef.current;
    let audio = document.getElementsByTagName('audio')[0];
    audio.volume = 0.5;
    audio.crossOrigin = 'anonymous';
    let audioSrc = context.createMediaElementSource(audio);
    audioSrc.connect(analyser);
    audioSrc.connect(context.destination);
    analyser.connect(context.destination);

    function renderFrame() {
      let primary = '#F59300';
      let secondary = '#00C9DD';
      let freqData = new Uint8Array(analyser.frequencyBinCount);
      requestAnimationFrame(renderFrame);
      analyser.getByteFrequencyData(freqData);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = primary;
      let bars = window.innerWidth;
      for (var i = 0; i < bars; i++) {
        let barX = i * 4;
        let barWidth = 2;
        let barHeight = -(freqData[i] / 0.8);
        if (barHeight > -65) {
          ctx.fillStyle = secondary;
        }
        ctx.fillRect(barX, canvas.height, barWidth, barHeight);
      }
    }

    renderFrame();
  };

  render() {
    let playPause = this.onPlayPause.bind(this);
    let seek = this.onSeekChange.bind(this);

    return (
        <Fragment>
          <HeaderPlayBar onPlayPause={playPause}
                         onSeek={seek}
                         playing={this.state.playing}
                         played={this.state.played}/>
          <div className='music-player-wrapper'>
            <ReactPlayer
                url={TestSong}
                playing={this.state.playing}
                onDuration={this.onDuration}
                onSeek={e => console.log('onSeek', e)}
                onProgress={this.onProgress}
            />
          </div>
          <div className={'canvasContainer'}>
            <div className={'vis-container'}>
              <canvas ref={this.canvasRef} width={window.innerWidth}
                      height={window.innerHeight / 2}
                      className={'audio-canvas'}/>
            </div>
          </div>
        </Fragment>
    );
  }
}

export default MusicPlayer;
