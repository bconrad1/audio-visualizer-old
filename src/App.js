/* eslint-disable react/jsx-filename-extension */
import React, {Component} from 'react';
import './App.scss';
import MusicPlayer from './music-player/music-player';
import Particles from './visualizer/particles';
import './static/styles/rangeStyle.css';
import FileUploader from './file-upload/FileUploader';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectionMade: false
    };
  }

  onSelectionClicked = () => {
    console.log('clicked');
    this.setState({
      selectionMade: true
    });
  };

  render() {
    return (
        <div className='App'>

          {this.state.selectionMade ?
              <MusicPlayer/> : <FileUploader
                  onClick={this.onSelectionClicked}/>}
          <Particles/>
          <div className={'github-container'}>
            <a href={'https://github.com/bconrad1'}
               className={'github-link grow'}>{'GitHub.com'}</a>
          </div>
          }
        </div>
    );
  }
}

export default App;
