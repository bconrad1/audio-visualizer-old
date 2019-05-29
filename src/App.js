/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import './App.scss';
import MusicPlayer from './components/music-player/music-player';
import Particles from './components/visualizer/particles';
import './static/styles/rangeStyle.css';
import FileUploader from './components/file-upload/FileUploader';
import { Footer } from './components/footer/footer';
import AudioVisualizer from './components/AudioVisualizer';

class App extends Component {
  render() {
    return (<AudioVisualizer />);
  }
}

export default App;
