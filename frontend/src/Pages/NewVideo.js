import React from "react";
import HeaderContainer from "../containers/HeaderContainer/HeaderContainer";
import BodyContainer from "../containers/BodyContainer/BodyContainer";
import FormNewVideo from "../components/SubComponents/FormNewVideo/FormNewVideo";
const NewVideo = props => {
  return (
    <React.Fragment>
      <HeaderContainer />
      <BodyContainer>
        <FormNewVideo />
      </BodyContainer>
    </React.Fragment>
  );
};

export default NewVideo;
