import React from "react";
import MapGL from "react-map-gl";

import Marker from "./Marker.js";

import { $vehicles } from "../utils/api.js";
import { getRgbForValue } from "../utils/color.js";

class InteractiveMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.7749,
        longitude: -122.4194,
        zoom: 13,
        width: this.props.width,
        height: this.props.height,
        startDragLngLat: null,
        isDragging: null
      },
      mapStyle: "mapbox://styles/mapbox/light-v9"
    };
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position =>
        this._recenterIfSF(position.coords)
      );
    } else {
      console.log("User not in SF");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.height) {
      const newState = this.state;
      newState.viewport.height = nextProps.height;
      this.setState(newState);
    }
    if (nextProps.width) {
      const newState = this.state;
      newState.viewport.width = nextProps.width;
      this.setState(newState);
    }
  }

  _recenter = coordinates => {
    const { latitude, longitude } = coordinates;
    const newViewport = { latitude, longitude };
    const viewport = Object.assign({}, this.state.viewport, newViewport);
    this.setState({ viewport });
  };

  // coordinates.longitude <= -122.0194 &&
  // coordinates.latitude <= 38.0749 &&
  // coordinates.longitude >= -122.8194 &&
  // coordinates.latitude >= 37.2749
  _recenterIfSF = coordinates => {
    if (
      false
    ) {
      console.log("Detected location in SF, recentering map");
      this._recenter(coordinates);
    } else {
      console.log("Detected location outside of SF, not recentering");
    }
  };

  _getBounds = () => {
    const rawBounds = this.map.getMap().getBounds();
    const bounds = {
      lat: {
        high: rawBounds._ne.lat,
        low: rawBounds._sw.lat
      },
      lon: {
        high: rawBounds._ne.lng,
        low: rawBounds._sw.lng
      }
    };
    return bounds;
  };

  _withinBounds = vehicle => {
    var lat = Number(vehicle.lat);
    var lon = Number(vehicle.lon);
    return (
      lat >= this._getBounds().lat.low &&
      lat <= this._getBounds().lat.high &&
      lon >= this._getBounds().lon.low &&
      lon <= this._getBounds().lon.high
    );
  };

  _onChangeViewport = newViewport => {
    const viewport = Object.assign({}, this.state.viewport, newViewport);
    this.setState({ viewport });
  };

  render() {
    const { mapStyle, viewport } = this.state;
    return (
      <MapGL
        mapboxApiAccessToken="pk.eyJ1IjoiZ2Vqb3NlIiwiYSI6ImNqMm8xZTg5ZjAyNHYzM3FieW14eGxvaGMifQ.DlQAXVocu-c7yXDxdTQ-tA"
        onChangeViewport={this._onChangeViewport}
        mapStyle={mapStyle}
        ref={map => (this.map = map)}
        {...viewport}
      >
        {this.props.vehiclePositions.filter((xy) => {
          return this.props.selectedRoutes.indexOf(xy.routeTag) !== -1;
        }).filter(this._withinBounds).map((xy, i) => {
          var lat = Number(xy.lat);
          var lon = Number(xy.lon);
          return (
            <Marker
              xy={{ x: lat, y: lon }}
              color={getRgbForValue(xy.secsSinceReport)}
              key={i}
              text={xy.routeTag}
            />
          );
        })}
      </MapGL>
    );
  }
}

export default InteractiveMap;
