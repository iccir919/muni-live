import React, { Component } from 'react';
import './App.css';
import InteractiveMap from "./components/InteractiveMap.js";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from "./components/NavBar.js";
import { $vehicles } from "./utils/api.js";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      windowDimensions: {
        height: 100,
        width: 100
      },
      selectedRoutes: [],
      vehiclePositions: [],
      routes: []
    };
  }

  componentDidMount() {
    this._updateDimensions();
    window.addEventListener("resize", this._updateDimensions);
    $vehicles.subscribe(data => {
      if(data.vehicle){
        data = data.vehicle;
        let routes = data.map(function(vehicle){
          return vehicle.routeTag;
        }).filter( onlyUnique ).sort().reverse();
        this.setState({ 
          vehiclePositions: data,
          routes: routes
         });
      }
    });
  }

  handleRouteListClick = (event, item) => {
    let tag = item.ref;
    if(this.state.selectedRoutes.indexOf(tag) == -1) {
      this.setState(function(prevState, props) {
        prevState.selectedRoutes.push(tag);
        return {
          selectedRoutes: prevState.selectedRoutes
        };
      });
    } else {
      let index = this.state.selectedRoutes.indexOf(tag);
      this.setState(function(prevState, props) {
        prevState.selectedRoutes.splice(index, 1);
        return {
          selectedRoutes: prevState.selectedRoutes
        };
      });     
    }

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
        <MuiThemeProvider>
          <NavBar 
            routes={this.state.routes}
            clickHandler={this.handleRouteListClick}
          />
        </MuiThemeProvider>
        <InteractiveMap
          height={this.state.windowDimensions.height}
          width={this.state.windowDimensions.width}
          selectedRoutes={this.state.selectedRoutes}
          vehiclePositions={this.state.vehiclePositions}
        />
      </div>
    );
  }
}

export default App;


function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}