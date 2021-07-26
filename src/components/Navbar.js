import React from "react";
import Moment from "react-moment";
import "../App.css";
import { faVirus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = ({ date }) => {
  return (
    <div className="navigationBar">
      <h3 style={{ marginBottom: "0" }}>
        <FontAwesomeIcon icon={faVirus} />
        &nbsp;COVID-TRACKER
      </h3>
      <h6 style={{ marginBottom: "0" }}>
        Last Updated:&nbsp;&nbsp;
        <Moment date={date} format="YYYY-MM-DD | HH:mm" />
      </h6>
    </div>
  );
};

export default Navbar;
