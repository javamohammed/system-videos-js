import React from "react";

import "./Card.css";
const Card = props => {
  const firstImageVideo = `https://img.youtube.com/vi/${props.vidId}/0.jpg`;
  const classCard = props.cardAdmin ? 'card-My-videos' : " card-suggestion"+props.classIndex
  const classCardImg = props.cardAdmin ? 'card-img-container-My-videos' : "card-img-container"+props.classIndex
  const classCardBody = props.cardAdmin ? 'card-body-container-my-videos' : "card-body-container"+props.classIndex
  return (
    <div className={"card hidden-over-flow "+classCard} onClick={props.eventclick}>
        <img className={"card-img-top "+classCardImg} src={firstImageVideo} alt="Card cap"/>
        <div className={"card-body "+classCardBody}>
            <div>
              <p className="card-text">{props.title}</p>
            </div>
        </div>
    </div>
  );
};

export default Card;
