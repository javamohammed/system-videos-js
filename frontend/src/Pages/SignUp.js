import React from "react";
import HeaderContainer from "../containers/HeaderContainer/HeaderContainer";
import BodyContainer from "../containers/BodyContainer/BodyContainer";
import FormSignUp from "../components/SubComponents/FormSignUp/FormSignUp";
const SignUp = props => {
  return (
    <React.Fragment>
      <HeaderContainer />
      <BodyContainer >
          <FormSignUp/>
      </BodyContainer>
    </React.Fragment>
  );
};

export default SignUp;
