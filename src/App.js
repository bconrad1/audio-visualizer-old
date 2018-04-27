/* eslint-disable react/jsx-filename-extension */
import React, {Component} from 'react';
import './App.scss';
import MusicPlayer from './music-player/music-player';
import Particles from 'react-particles-js';

import particleConfig from './static/particle-config';
import './static/styles/rangeStyle.css';

class App extends Component {
  render() {
    return (
        <div className='App'>
          <MusicPlayer/>
          <Particles params={particleConfig} className={'floating-particles'} height={window.innerHeight - 50}/>
        </div>
    );
  }
}

export default App;
