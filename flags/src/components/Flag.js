import React from "react";

function Answer(props) {
  if (props.sign === 1) {
    return <div className="flags__answer">That's correct!</div>;
  } else if (props.sign === 2)
    return <div className="flags__answer">Nope!</div>;
  else return <></>;
}

export default function Flag(props) {
  return (
    <div className="flags">
      <Answer sign={props.sign} />
      <img className="flags__img" src={props.src} alt="flag"></img>
    </div>
  );
}
