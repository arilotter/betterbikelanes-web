import React from "react";
import Polyline from "./Polyline";

const flightPlanCoordinates = [
  [
    { lat: 43.659888, lng: -79.389941 },
    { lat: 43.65806784156866, lng: -79.38955548669435 }
  ],

  [
    { lat: 43.65806784156866, lng: -79.38955548669435 },
    { lat: 43.65606687378155, lng: -79.39931872750856 }
  ],

  [
    { lat: 43.65606687378155, lng: -79.39931872750856 },
    { lat: 43.657944, lng: -79.399941 }
  ],
  [{ lat: 43.657944, lng: -79.399941 }, { lat: 43.659888, lng: -79.389941 }]

];

export default ({ map, maps, traffic, hazard }) => {
  const pickColor = index => {
    if (traffic || hazard) {
      if (index === 3) {
        return "red";
      } else {
        return "#2196F3";
      }
    } else {
      if (index === 3) {
        return "#2196F3";
      } else {
        return "#aeaeae";
      }
    }
  };
  return flightPlanCoordinates.map(([origin, destination], index) => {
    return (
      <Polyline
        key={origin.lat}
        map={map}
        maps={maps}
        origin={origin}
        destination={destination}
        color={pickColor(index)}
      />
    );
  });
};
