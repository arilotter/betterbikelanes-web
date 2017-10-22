import React from "react";

const K_WIDTH = 40;
const K_HEIGHT = 40;

const style = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: "absolute",
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,

  border: "5px solid #B71C1C",
  borderRadius: K_HEIGHT,
  backgroundColor: "#F44336",
  textAlign: "center",
  color: "#3f51b5",
  fontSize: 16,
  fontWeight: "bold",
  padding: "4px"
};

export default ({ count }) => <div style={style}>Obstruction!</div>;