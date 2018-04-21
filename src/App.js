import React, {Component} from 'react';
import './App.css';
import MusicPlayer from './music-player/music-player';

class App extends Component {
   componentDidMount() {
    //initAnalyzer();
  }

  render() {
    return (
      <div className='App'>
        <MusicPlayer/>
      </div>
    );
  }
}

export default App;
