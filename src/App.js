import React, { Component } from 'react';
import './App.css';
import InteractiveMap from "./components/InteractiveMap.js";
import NavBar from "./components/NavBar.js";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      windowDimensions: {
        height: 100,
        width: 100
      }
    };
  }

  componentDidMount() {
    this._updateDimensions();
    window.addEventListener("resize", this._updateDimensions);
  }

  _updateDimensions = () => {
    this.setState({
      windowDimensions: {
        height: window.innerHeight,
        width: window.innerWidth
      }
    });
  };

  render() {
    return (
      <div>
        <NavBar />
        <InteractiveMap
          height={this.state.windowDimensions.height}
          width={this.state.windowDimensions.width}
        />
      </div>
    );
  }
}

export default App;
