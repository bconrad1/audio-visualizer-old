import React, {Component} from 'react';
import '../appStyle.css';
import TestSong from '../static/walkonby.mp3';
import TestSong2 from '../static/jungle.mp3';

class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 1
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
  }

  initVisualization = () => {
    let context = new AudioContext();
    let analyser = context.createAnalyser();
    let canvas = this.canvasRef.current;
    let ctx = canvas.getContext('2d');

    let audio = this.audioRef.current;
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
        ctx.fillRect(barX, canvas.height / 2, barWidth, barHeight);
      }
    }
    renderFrame();
  }

  render() {
    return (
        <div className='music-player-wrapper'>
          <audio ref={this.audioRef}src={TestSong2} type='audio/mpeg' autoPlay/>
          <div className={'canvasContainer'}/>
            <canvas ref={this.canvasRef} width={window.innerWidth} height={window.innerHeight}/>
        </div>

    );
  }
}

export default MusicPlayer;
