import React from "react";
import Card from "./Card";

const CovidSummary = ({
  totalConfirmed,
  totalRecovered,
  totalDeaths,
  country,
}) => {
  return (
    <div>
      <div>
        <h2 className="text-secondary mt-3" style={{ marginBottom: "40px" }}>
          {country === "" ? "Global" : country}
        </h2>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card title="Confirmed Cases" amount={totalConfirmed} color="primary" />
        <Card title="Recovered Cases" amount={totalRecovered} color="success" />
        <Card title="Death Cases" amount={totalDeaths} color="danger" />
      </div>
    </div>
  );
};

export default CovidSummary;
