/* eslint-disable react/jsx-filename-extension */
import React, {Component, Fragment} from 'react';
import './App.scss';
import MusicPlayer from './music-player/music-player';
import Particles from './visualizer/particles';
import './static/styles/rangeStyle.css';
import FileUploader from './file-upload/FileUploader';
import BackButton from './music-player/back-button';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectionMade: false
    };
    console.log(this.state.selectionMade);
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
              (<Fragment>
                <MusicPlayer songs={this.state.files}/>
                <BackButton
                    onBackClick={this.onBackClick}/>
              </Fragment>) :
              <FileUploader
                  onSampleClick={this.onSelectionClicked}
                  onUploadClick={this.onUploadClick}/>}
          <Particles/>
          <div className={'github-container'}>
            <a href={'https://github.com/bconrad1'}
               className={'github-link grow'}>{'GitHub.com'}</a>
          </div>
        </div>
    );
  }
}

export default App;
