/* eslint-disable react/prop-types */
import React, {Component, Fragment} from 'react';
import '../static/styles/appStyle.css';
import PropTypes from 'prop-types';

class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 1,
    };

    this.canvasRef = React.createRef();
    this.initVisualization = this.initVisualization.bind(this);
  }

  componentDidMount() {
    this.initVisualization();
  }

  initVisualization = () => {
    let context = new AudioContext();
    let analyser = context.createAnalyser();
    let canvas = this.canvasRef.current;
    let ctx = canvas.getContext('2d');
    let width = window.innerWidth;

    let audio = document.getElementsByTagName('audio')[0];
    audio.volume = 0.5;
    audio.crossOrigin = 'anonymous';
    let audioSrc = context.createMediaElementSource(audio);
    audioSrc.connect(analyser);
    audioSrc.connect(context.destination);
    analyser.connect(context.destination);

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      width = window.innerWidth;
      console.log('resizing');
    }

    window.addEventListener('resize', resizeCanvas, false);

    function renderBars() {
      let freqData = new Uint8Array(analyser.frequencyBinCount);
      requestAnimationFrame(renderBars);
      analyser.getByteFrequencyData(freqData);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ffffff';
      let bars = freqData.length;
      for (let i = 0; i < bars; i++) {
        let barX = i * 4;
        let barWidth = 2;
        let barHeight = -(freqData[i] / 0.7);
        ctx.fillRect(barX, canvas.height / 2, barWidth, barHeight);
        ctx.fillRect(barX, ((canvas.height / 2) - 1), barWidth,
            (barHeight * -1));
      }
    }

    function renderCircle() {
      let freqData = new Uint8Array(analyser.frequencyBinCount);
      requestAnimationFrame(renderCircle);

      analyser.getByteFrequencyData(freqData);
      let maxBinCount = freqData.length;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();

      ctx.scale(0.5, 0.5);
      ctx.translate(window.innerWidth, window.innerHeight);
      ctx.fillStyle = '#ffffff';

      let radius, barLength, innerRadius, innerHeight;

      switch (true) {
        case (width >= 1200):
          radius = -400;
          barLength = 0.6;
          innerRadius = (-radius - 100);
          innerHeight = 1;
          break;
        case (width > 750 && width < 1200):
          radius = -300;
          barLength = 0.7;
          innerRadius = (-radius - 50);
          innerHeight = 1.5;
          break;
        default:
          radius = -200;
          barLength = 0.8;
          innerRadius = (-radius - 25);
          0;
          innerHeight = 2;
          break;
      }
      //all freq
      for (let i = 0; i < maxBinCount; i++) {
        let value = freqData[i];
        ctx.fillStyle = '#fffae6';
        let barHeight = -value / barLength;
        ctx.fillRect(0, radius, 4, barHeight);
        ctx.rotate((180 / 128) * Math.PI / 180);
      }

      ctx.beginPath();
      ctx.arc(0, 0, -radius, 0, 2 * Math.PI);
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#FFFFFF';
      ctx.strokeStyle = '#fff5cc';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    }

    if (this.props.currentVis === 'circle') {
      renderCircle();
    } else {
      renderBars();
    }
  };

  render() {
    return (
        <Fragment>
          <div className={'canvas-container'}>
            <div className={'vis-container'}>
              <canvas ref={this.canvasRef}
                      width={window.innerWidth}
                      height={window.innerHeight}
                      className={'audio-canvas'}/>
              <div className={'inner-circle'}/>
            </div>
          </div>
        </Fragment>
    );
  }
}

export default Visualizer;

Visualizer.proptypes = {
  currentVis: PropTypes.func,
};
