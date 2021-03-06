import React, { Component } from "react";
import Navbar from "./Navbar";
import Map from "./map/Map";
import "./App.css";

const ENDPOINT = "/database";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      sensors: [],
      hazards: [],
      traffic: false
    };
    setInterval(this.refreshSensors.bind(this), 100);
  }
  refreshSensors() {
    fetch(ENDPOINT)
      .then(res => res.json())
      .then(json => {
        const s = {
          sensors: Object.entries(
            json.sensors
          ).map(([key, { location, readings }]) => ({
            uuid: key,
            lat: location.lat,
            lng: location.lng,
            count: readings.filter(
              reading => (new Date().getTime() - reading) < 30000
            ).length
          })),
          hazards: json.hazards.filter(
            ({ time }) => new Date().getTime() - time < 15000
          )
        };
        console.log(s.sensors);
        const test = s.sensors.filter(s => s.uuid === "xxx2");
        if (test.length === 1) {
          s.traffic = test[0].count > 3;
        }
        console.log(s);
        this.setState(s);
      });
  }
  render() {
    return (
      <div>
        <Navbar />
        <Map
          sensors={this.state.sensors}
          traffic={this.state.traffic}
          hazards={this.state.hazards}
        />
      </div>
    );
  }
}
