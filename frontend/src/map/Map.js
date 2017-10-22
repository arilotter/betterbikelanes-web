import React from "react";

import GoogleMapReact from "google-map-react";
import Sensor from "./Sensor";
import Hazard from "./Hazard";
import DemoLines from "./DemoLines";

export default class SimpleMap extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static defaultProps = {
    center: { lat: 43.6572243, lng: -79.395376 },
    zoom: 16
  };

  render() {
    const sensorsOnMap = this.props.sensors.map(
      ({ uuid, lat, lng, count }) => (
        <Sensor key={uuid} lat={lat} lng={lng} count={count} />
      )
    );
    const hazards = this.props.hazards.map(
      ({ time, lat, lng }) => (
        <Hazard key={time} lat={lat} lng={lng}/>
      )
    );

    return (
      <div>
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          mapType="satellite"
          bootstrapURLKeys={{
            key: "AIzaSyCl4kR-p0ieKib-mE4RD7TjQRY6w_MnmyI",
            language: "en"
          }}
          onGoogleApiLoaded={({ map, maps }) => {
            this.setState({ map: map, maps: maps, mapLoaded: true });
          }}
          yesIWantToUseGoogleMapApiInternals
          style={{
            width: "100vw",
            height: "calc(100vh - 64px)"
          }}
        >
          {sensorsOnMap}
          {hazards}
        </GoogleMapReact>
        {this.state.mapLoaded && (
          <DemoLines map={this.state.map} maps={this.state.maps} traffic={this.props.traffic} hazard={hazards.length > 0} />
        )}
      </div>
    );
  }
}
