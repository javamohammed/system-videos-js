import React from "react";

//import Body from "../../components/Body/Body";
import "./BodyContainer.css";
const BodyContainer = props => {
  return (
    <div className="row align-items-start row-body-customized">
      <div className="col">
        <div className="body-container">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default BodyContainer;
