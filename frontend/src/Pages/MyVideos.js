import React from "react";
import HeaderContainer from "../containers/HeaderContainer/HeaderContainer";
import BodyContainer from "../containers/BodyContainer/BodyContainer";
import MyVideosComponent from "../components/SubComponents/MyVideosComponent/MyVideosComponent";
const MyVideos = props => {
  return (
    <React.Fragment>
      <HeaderContainer />
      <BodyContainer>
        <MyVideosComponent  />
      </BodyContainer>
    </React.Fragment>
  );
};

export default MyVideos;
