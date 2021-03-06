import React, { PureComponent } from "react";

class Polyline extends PureComponent {
  componentWillUpdate() {
    this.line.setMap(null);
  }

  componentWillUnmount() {
    this.line.setMap(null);
  }

  getPaths() {
    const { origin, destination } = this.props;

    return [
      { lat: Number(origin.lat), lng: Number(origin.lng) },
      { lat: Number(destination.lat), lng: Number(destination.lng) }
    ];
  }

  render() {
    const Polyline = this.props.maps.Polyline;

    const renderedPolyline = this.renderPolyline();
    const paths = { path: this.getPaths() };

    this.line = new Polyline(Object.assign({}, renderedPolyline, paths));

    this.line.setMap(this.props.map);

    return null;
  }

  renderPolyline() {
    throw new Error("Implement renderPolyline method");
  }
}

export default class Normal extends Polyline {
  renderPolyline() {
    return {
      geodesic: true,
      strokeColor: this.props.color || "#ffffff",
      strokeOpacity: 0.9,
      strokeWeight: this.props.color === '#2196F3' ? 8 : 5
    };
  }
}
