import React from "react";
import HeaderContainer from "../containers/HeaderContainer/HeaderContainer";
import BodyContainer from "../containers/BodyContainer/BodyContainer";
import FormLogin from "../components/SubComponents/FormLogin/FormLogin";
const Login = props => {
  return (
    <React.Fragment>
      <HeaderContainer />
      <BodyContainer>
        <FormLogin/>
      </BodyContainer>
    </React.Fragment>
  );
};

export default Login;
