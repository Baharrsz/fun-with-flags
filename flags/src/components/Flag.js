import React from "react";

function Anouncement(props) {
  if (props.sign === 1) {
    return <h2 className="flags__anouncement">That's correct!</h2>;
  } else if (props.sign === 2)
    return <h2 className="flags__anouncement">Nope!</h2>;
  else if (props.sign === 3)
    return (
      <div className="flags__anouncement">
        <h2 className="flags__anouncement-answer">{props.answer}</h2>
        <button
          className="flags__anouncement-button"
          onClick={props.handleNext}
        >
          Next
        </button>
      </div>
    );
  else return <></>;
}

export default function Flag(props) {
  return (
    <div className="flags">
      <Anouncement
        sign={props.sign}
        answer={props.answer}
        handleNext={props.handleNext}
      />
      <img className="flags__img" src={props.src} alt="flag"></img>
    </div>
  );
}
