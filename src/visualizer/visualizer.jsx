import React, {Component, Fragment} from 'react';
import '../static/styles/appStyle.css';

class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 1
    };

    this.canvasRef = React.createRef();
    this.initVisualization = this.initVisualization.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    //window.addEventListener('resize', this.updateWindowDimensions);
    this.initVisualization();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  };

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

    function renderFrame() {
      let primary = '#F59300';
      let secondary = '#00C9DD';
      let freqData = new Uint8Array(analyser.frequencyBinCount);

      requestAnimationFrame(renderFrame);
      analyser.getByteFrequencyData(freqData);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = primary;
      let bars = 2500;
      for (let i = 0; i < bars; i++) {
        let barX = i * 4;
        let barWidth = 2;
        let barHeight = -(freqData[i] / 0.7);
        if (barHeight > -65) {
          ctx.fillStyle = secondary;
        }
        ctx.fillRect(barX, canvas.height / 2, barWidth, barHeight);
        ctx.fillRect(barX, ((canvas.height / 2) - 1), barWidth, (barHeight * -1));
      }
    }

    renderFrame();
  };

  render() {
    return (
        <Fragment>
          <div className={'canvasContainer'}>
            <div className={'vis-container'}>
              <canvas ref={this.canvasRef}
                      width={window.innerWidth}
                      height={window.innerHeight}
                      className={'audio-canvas'}/>
            </div>
          </div>
        </Fragment>
    );
  }
}

export default Visualizer;
