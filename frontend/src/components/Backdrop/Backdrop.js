import React from "react";
import "./Backdrop.css";
const Backdrop = props => {
    const classOpen = props.backdrop ? " open" : " ";
    //console.log(props.backdrop);
  return (
    <div>
      <div className={"backdrop" + classOpen}></div>
      <div className={"modal" + classOpen}>
          <div className="close-tab" onClick={props.onclosemenu}><i className="far fa-window-close"></i></div>
          {props.children}
      </div>
    </div>
  );
};

export default Backdrop;
