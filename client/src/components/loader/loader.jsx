import React from "react";
import "./loader.css";

const Loader = props => {
  return (
    <center>
      <div {...props} className="loading">
        <div></div>
        <div></div>
      </div>
    </center>
  );
};
export default Loader;
