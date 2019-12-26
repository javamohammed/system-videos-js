import React from "react";
import { NavLink } from "react-router-dom";
const NavigationItem = props => {
  return (
      <li>
        <NavLink to={props.to} exact>
          <span className="menu-li">
            <i className={"fas "+ props.myicon}></i> {props.children}
          </span>
        </NavLink>
      </li>
  );
};

export default NavigationItem;
