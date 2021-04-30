import React from "react";

export default function Flag({ announce, src }) {
  return (
    <div className="flag">
      <div className="flag__announce">{announce}</div>
      <img className="flag__img" src={src} alt="flag"></img>
    </div>
  );
}
