import React from "react";

export default function Flag({ announce, src }) {
  return (
    <div className="flags">
      <div className="flags__answer">{announce}</div>
      <img className="flags__img" src={src} alt="flag"></img>
    </div>
  );
}
