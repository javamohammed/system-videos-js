import React from "react";

const Message = props => {
    return (
      <div className={props.nameClass}>
            <ul>{props.children}</ul>
      </div>
    );
}

export default Message