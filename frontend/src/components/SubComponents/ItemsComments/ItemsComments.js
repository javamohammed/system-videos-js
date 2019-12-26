import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCommentAction } from "../../../store/actions/videos";
import InputComment from "../../UI/InputComment/InputComment";
import ItemComment from "../ItemComment/ItemComment";
import "./ItemsComments.css";
const ItemsComments = props => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.user.token)
  const comments = props.comments
  const video = props.video;
  const getComments = () => {
    let k = 0;
    return comments.map(cmnt => {
      return (
        <React.Fragment key={k++}>
          <ItemComment
            comment={cmnt.comment}
            firstname={cmnt.user.first_name}
            createdat={cmnt.created_at}
          />
          <hr className="my-4" />
        </React.Fragment>
      );
    })
  }
  const addCommentHandler = comment => {
    dispatch(addCommentAction(video, comment, token));
  };
  return (
    <div className="player-comments-container">
      <InputComment oncomment={addCommentHandler} />
      <div className="list-comments">{getComments()}</div>
    </div>
  );
};

export default ItemsComments;
