import React,{useState} from "react";

import "./InputComment.css";
const InputComment = props => {

  const [comment, setComment] = useState('')
  const [enter, setEnter] = useState(false);
  const addComment = (event) => {
    if (event.key === "Enter") {
      setEnter(true)
      props.oncomment(comment);
      setComment('')
    }
  }
  const onChangeText = event => {
    if (!enter) {
      setComment(event.target.value);
    }
  }
  return (
    <div className="inputs-comment">
      <form>
        <div className="form-group">
          <label htmlFor="postYourComment">Post your comment</label>
          <textarea
            onChange={onChangeText}
            value={comment}
            onKeyUp ={(event) => {
              if(event.key ==="Enter"){
                  setEnter(false);
              }
            }}
            onKeyPress={addComment}
            className="form-control post-your-comment-input"
            id="postYourComment"
            rows="3"
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default InputComment;
