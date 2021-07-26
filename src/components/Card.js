import React from "react";
import CountUp from "react-countup";

const Card = ({ title, amount, color }) => {
  return (
    <div
      className="cardZoom shadow-lg"
      style={{
        width: "19rem",
        borderRadius: "5px",
        borderWidth: "0",
        backgroundColor: "white",
      }}
    >
      <div className={`card-body`}>
        <p className={`card-text text-${color}`} style={{ fontSize: "2.5rem" }}>
          <CountUp end={amount} separator="," />
        </p>
        <h5 className="card-subtitle mb-2 text-secondary ">{title}</h5>
      </div>
    </div>
  );
};

export default Card;
