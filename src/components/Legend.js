import React from "react";

import "./Legend.css";
import { MarkerSvg } from "./Marker.js";
import { getRgbForValue } from "../utils/color.js";

const Legend = () => (
  <div className="legend">
    <h1 className="legend__title">Vehicle Location Legend</h1>
    <div className="legend-line">
      <span>
        <MarkerSvg color={getRgbForValue(50)} />Data from >= 50s ago
      </span>
    </div>
    <div className="legend-line">
      <span>
        <MarkerSvg color={getRgbForValue(0)} />Data from 0s ago
      </span>
    </div>
  </div>
);

export default Legend;