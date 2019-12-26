import React from "react";
import "./PlayVideo.css";
const PlayVideo = props => {
  return (
    <React.Fragment>
      <div className="player-container">
        <iframe
          id="youtube-iframe"
          allowFullScreen=""
          frameBorder="0"
          src={`https://www.youtube.com/embed/${props.id}?autoplay=1&loop=1`}
          title="Player"
        ></iframe>
      </div>
      <div className="player-title-container">
        <p>{props.title}</p>
      </div>
    </React.Fragment>
  );
};

export default PlayVideo;
