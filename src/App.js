import React, {Component} from 'react';
import './App.scss';
import MusicPlayer from './music-player/music-player';
import Visualizer from './visualizer/visualizer';

import './static/styles/rangeStyle.css';

class App extends Component {
   componentDidMount() {
    //initAnalyzer();
  }

  render() {
    return (
      <div className='App'>
        <MusicPlayer/>
        <Visualizer/>
      </div>
    );
  }
}

export default App;
