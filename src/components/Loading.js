import React from "react";

const Loading = () => {
  return (
    <div
      className="d-flex justify-content-center"
      style={{
        height: "100vh",
        alignItems: "center",
        backgroundColor: "#E9E9E9",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="spinner-border" role="status"></div>
        <div>Please Wait</div>
      </div>
    </div>
  );
};

export default Loading;
