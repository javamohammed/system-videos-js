import React from "react";

import Header from "../../components/Header/Header";
import "./HeaderContainer.css";
const HeaderContainer = props => {
  return (
    <div className="row align-self-center align-items-center row-header-customized">
        <Header/>
    </div>
  );
};

export default HeaderContainer;
