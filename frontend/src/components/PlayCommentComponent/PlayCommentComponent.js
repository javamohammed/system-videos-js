import React from "react";
import { useSelector } from "react-redux";
import PlayVideo from "../SubComponents/PlayVideo/PlayVideo";
import { Redirect } from "react-router-dom";
import ItemsComments from "../SubComponents/ItemsComments/ItemsComments";
import "./PlayCommentComponent.css";
const PlayCommentComponent = props => {
  const currentVideo = useSelector(state => state.videos.currentVideo);
  //console.log("length:::", Object.entries(currentVideo).length);

  if (Object.entries(currentVideo).length === 0) {
    return <Redirect to="/" />;
  }
  return (
    <div className="play-comments-container">
      <PlayVideo
        id={currentVideo.video[0].id_video}
        title={currentVideo.video[0].title}
      />
      <ItemsComments
        video={currentVideo.video[0]._id}
        comments={currentVideo.comments}
      />
    </div>
  );
};

export default PlayCommentComponent;
