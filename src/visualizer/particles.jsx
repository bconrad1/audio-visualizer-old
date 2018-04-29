import React, {Component, Fragment} from 'react';

class Particles extends Component {
  constructor(props) {
    super(props);
    this.canvasRefParticles = React.createRef();
    this.initParticles = this.initParticles.bind(this);
  }

  componentDidMount() {
    this.initParticles();
  }

  initParticles = () => {
    let canvas = this.canvasRefParticles.current;
    let ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particles = [];
    let numParticles = 75;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    window.addEventListener('resize', resizeCanvas, false);

    function getColor() {
      let randomOpacity = Math.random();

      let colors = [
        '255, 235, 153',
        '255, 255, 255'];

      return `rgba(${colors[Math.floor(Math.random() * 3)]},${randomOpacity}`;
    }

    let Particle = function () {
      this.x = canvas.width * Math.random();
      this.y = canvas.height * Math.random();
      this.vx = 0.5 * (Math.random()) - 0.2;
      this.vy = 0.5 * (Math.random()) - 0.2;
      this.particleSize = Math.floor(Math.random() * 4) + 1;
      this.color = getColor();
    };

    Particle.prototype.Draw = function (canvasCtx) {
      canvasCtx.fillStyle = this.color;
      canvasCtx.beginPath();
      canvasCtx.arc(this.x, this.y, this.particleSize, 0, 2 * Math.PI);
      canvasCtx.fill();
      canvasCtx.shadowBlur = 25;
      canvasCtx.shadowColor = '#FFFFFF';
      canvasCtx.strokeStyle = this.color;
      canvasCtx.stroke();
    };

    Particle.prototype.Update = function () {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) {
        this.vx = -this.vx;
      }
      if (this.y < 0 || this.y > canvas.height) {
        this.vy = -this.vy;
      }
    };

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (var i = 0; i < numParticles; i++) {
        particles[i].Update();
        particles[i].Draw(ctx);
      }
      requestAnimationFrame(loop);
    }

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    loop();
  };

  render() {
    return (
        <div>
          <canvas ref={this.canvasRefParticles} className={'floating-particles'}
                  height={window.innerHeight - 50}/>
        </div>
    );
  }
}

export default Particles;