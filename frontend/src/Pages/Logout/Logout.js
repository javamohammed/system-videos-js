/*import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from '../../store/actions/user';


const Logout = props => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(logout())
    
    async function logoutHandler() {
      await dispatch(logout());
    }
    logoutHandler();
  }, [dispatch]);
  return <Redirect from="/logout" to="/"/>;
};

export default Logout;

*/
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../../store/actions/user";
class Logout extends React.Component {
  componentDidMount() {
    this.props.onLogout();
  }
  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => {
      dispatch(logout());
    }
  };
};

export default connect(null, mapDispatchToProps)(Logout);