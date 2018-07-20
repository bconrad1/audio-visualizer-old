/* eslint-disable react/jsx-filename-extension */
import React, {Component} from 'react';
import './App.scss';
import MusicPlayer from './components/music-player/music-player';
import Particles from './components/visualizer/particles';
import './static/styles/rangeStyle.css';
import FileUploader from './components/file-upload/FileUploader';
import {Footer} from './components/footer/footer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectionMade: false
    };
  }

  onSelectionClicked = () => {
    this.setState({
      selectionMade: true
    });
  };

  onUploadClick = (e) => {
    this.setState({
      files: e.target.files,
      selectionMade: true
    });
  };

  onBackClick = () => {
    this.setState({
      selectionMade: false
    });
  };
  render() {
    return (
        <div className='App'>
          {this.state.selectionMade ?
              (<MusicPlayer songs={this.state.files}/>) :
              <FileUploader
                  onSampleClick={this.onSelectionClicked}
                  onUploadClick={this.onUploadClick}/>}
          <Particles/>
          <Footer selectionMade={this.state.selectionMade} onBackClick={this.onBackClick}/>
        </div>
    );
  }
}

export default App;
