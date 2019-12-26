import React from "react";
import HeaderContainer from "../containers/HeaderContainer/HeaderContainer";
import BodyContainer from "../containers/BodyContainer/BodyContainer";
import SuggestionVideos from "../components/SubComponents/Suggestion/SuggestionVideos";
const Index = props => {
  const v = props.location.search.split('=')[1]
  return (
    <React.Fragment>
      <HeaderContainer />
      <BodyContainer>
        <SuggestionVideos haveTitle={true} search={v} />
      </BodyContainer>
    </React.Fragment>
  );
};

export default Index;
