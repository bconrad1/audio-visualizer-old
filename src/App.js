/* eslint-disable react/jsx-filename-extension */
import React, {Component} from 'react';
import './App.scss';
import MusicPlayer from './music-player/music-player';
import Particles from './visualizer/particles';
import './static/styles/rangeStyle.css';

class App extends Component {
  render() {
    return (
        <div className='App'>
          <MusicPlayer/>
          <Particles/>
        </div>
    );
  }
}

export default App;
