import React from "react";
import HeaderContainer from "../containers/HeaderContainer/HeaderContainer";
import BodyContainer from "../containers/BodyContainer/BodyContainer";
import PlayCommentComponent from "../components/PlayCommentComponent/PlayCommentComponent";
import SuggestionVideos from "../components/SubComponents/Suggestion/SuggestionVideos";
const Watch = props => {
  return (
    <React.Fragment>
      <HeaderContainer />
      <BodyContainer>
        <PlayCommentComponent />
        <SuggestionVideos haveTitle={false} suggestionWatch />
      </BodyContainer>
    </React.Fragment>
  );
};

export default Watch;
