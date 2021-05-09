import React from "react";
import loading from "../assets/loading.svg";

export default function Loading() {
  return (
    <div className="loading">
      <img className="loading__img" src={loading} alt="loading" />
      <h1 className="loading__text">Loading...</h1>
    </div>
  );
}
