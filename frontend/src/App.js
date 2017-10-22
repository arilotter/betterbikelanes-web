import React, { Component } from "react";
import Navbar from "./Navbar";
import Map from "./map/Map";
import "./App.css";

const ENDPOINT = "http://localhost:6969/";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      sensors: []
    };
    setInterval(this.refreshSensors.bind(this), 100);
  }
  refreshSensors() {
    fetch(ENDPOINT)
      .then(res => res.json())
      .then(json => {
        this.setState({
          sensors: Object.entries(
            json
          ).map(([key, { location, readings }]) => ({
            uuid: key,
            lat: location.lat,
            lng: location.lng,
            count: readings.length
          }))
        });
      });
  }
  render() {
    return (
      <div
        style={{
          width: "100vw",
          height: "calc(100vh - 64px)"
        }}
      >
        <Navbar />
        <Map sensors={this.state.sensors} />
      </div>
    );
  }
}
