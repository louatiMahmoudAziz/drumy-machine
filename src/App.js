import React, { Component } from 'react';
import './App.css'; 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSound: '' 
    };
    this.handlePlaySound = this.handlePlaySound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    // Define drumPads as a class property
    this.drumPads = [
      { key: 'Q', sound: 'Heater 1', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
      { key: 'W', sound: 'Heater 2', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
      { key: 'E', sound: 'Heater 3', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
      { key: 'A', sound: 'Heater 4', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
      { key: 'S', sound: 'Clap', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
      { key: 'D', sound: 'Open-HH', src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
      { key: 'Z', sound: 'Kick-n\'-Hat', src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
      { key: 'X', sound: 'Kick', src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
      { key: 'C', sound: 'Closed-HH', src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' },
    ];
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(event) {
    const key = event.key.toUpperCase(); // Convert to uppercase to match drumPad keys
    const drumPad = this.drumPads.find(pad => pad.key === key);

    if (drumPad) {
      this.handlePlaySound(drumPad.sound);
      const audio = document.getElementById(drumPad.key);
      if (audio) {
        audio.play();
      }
    }
  }

  handlePlaySound(sound) {
    this.setState({ currentSound: sound });
  }

  render() {
    return (
      <div id="drum-machine" className="App">
        <Display currentSound={this.state.currentSound} />
        <div className="drum-pads">
          {this.drumPads.map(pad => (
            <DrumPad 
              key={pad.key}
              keyTrigger={pad.key}
              sound={pad.sound}
              src={pad.src}
              handlePlaySound={this.handlePlaySound}
            />
          ))}
        </div>
      </div>
    );
  }
}

class Display extends Component {
  render() {
    return (
      <div id="display">
        {this.props.currentSound}
      </div>
    );
  }
}

class DrumPad extends Component {
  constructor(props) {
    super(props);
    this.playSound = this.playSound.bind(this);
  }

  playSound() {
    const audio = document.getElementById(this.props.keyTrigger);
    audio.play();
    this.props.handlePlaySound(this.props.sound);
  }

  render() {
    return (
      <div className="drum-pad" id={this.props.sound} onClick={this.playSound}>
        {this.props.keyTrigger}
        <audio 
          className="clip" 
          id={this.props.keyTrigger} 
          src={this.props.src} 
        />
      </div>
    );
  }
}

export default App;
