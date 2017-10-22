import React from "react";

import GoogleMapReact from "google-map-react";
import Sensor from "./Sensor";


export default class SimpleMap extends React.Component {
  static defaultProps = {
    center:{lat:43.6665711, lng:-79.4020446},
    zoom: 13
  };

  render() {
    const sensorsOnMap = this.props.sensors.map(({ uuid, lat, lng, count, dir }) => (
      <Sensor key={uuid} lat={lat} lng={lng} count={count} dir={dir} />
    ));
  
    return (
       <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
      {sensorsOnMap}

      </GoogleMapReact>
    );
  }
}