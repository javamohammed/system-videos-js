import React from 'react'
import "./Layout.css";

const Layout = props => {
    return (
          <div className="container  full-container">
             {props.children}
          </div>
    );
}

export default Layout