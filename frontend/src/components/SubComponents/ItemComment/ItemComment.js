import React from "react";

import "./ItemComment.css";
const ItemComment = props => {
  return (
    <div className="comment">
      <div className="avatar-user">
        <img
          className="img-avatar-user rounded-circle "
          src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="avatar"
        />
      </div>
      <div className="comment-body">
        <div className="comment-panel-heading">
          <strong className="user-name-style-strong">{props.firstname}</strong>{" "}
          <span className="text-muted user-name-style-span">
            {props.createdat}
          </span>
        </div>
        <div className="comment-panel-body">
          <p>{props.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemComment;
