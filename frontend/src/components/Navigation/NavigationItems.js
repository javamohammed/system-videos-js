import React from "react";
import NavigationItem from "./NavigationItem";
const NavigationItems = props => {
    const token = localStorage.getItem("token");
    const isAuth = token !== null ? true: false
  return (
    <ul className="Menu-user">
        <NavigationItem to="/" myicon="fa-home"> Home</NavigationItem>
        {!isAuth && <NavigationItem to="/login" myicon="fa-sign-in-alt"> Login</NavigationItem>}
        {!isAuth && <NavigationItem to="/register" myicon="fa-user-plus"> Register</NavigationItem>}
        {isAuth && <NavigationItem to="/account" myicon="fa-user-circle"> Account</NavigationItem>}
        {isAuth && <NavigationItem to="/myvideos" myicon="fa-video"> My Videos</NavigationItem>}
        {isAuth && <NavigationItem to="/new" myicon="fa-plus"> New Video</NavigationItem>}
        {isAuth && <NavigationItem to="/logout" myicon="fa-sign-out-alt" > Logout</NavigationItem>}
    </ul>
  );
};

export default NavigationItems;
