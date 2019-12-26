import React from 'react';
import Layout from './Pages/Layout/Layout'
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authCheckState } from "./store/actions/user";
import Watch from "./Pages/Watch";
import Logout from "./Pages/Logout/Logout";
import ConfirmEmail from "./Pages/ConfirmEmail";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Index";
import MyVideos from "./Pages/MyVideos";
import NewVideo from "./Pages/NewVideo";
class  App extends React.Component {

    componentDidMount(){
    this.props.onTrySignIn()
  }
  render(){
    //console.log("REACT_APP_NOT_SECRET_CODE::::",process.env);
    let routes = (
                  <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/videos/search"  component={Home} />
                    <Route path="/watch/:id_video" component={Watch} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={SignUp} />
                    <Route path="/confirm/email/:id/:emailParam" component={ConfirmEmail} />
                   <Redirect to="/" />
                  </Switch>
            );
    if(this.props.isAuth){
        //console.log("isAuth:::", this.props.token, this.props.isAuth);
            routes = (
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/videos/search"  component={Home} />
                <Route path="/watch/:id_video" component={Watch} />
                <Route path="/myvideos" component={MyVideos} />
                <Route path="/new" component={NewVideo} />
                <Route path="/logout" component={Logout} />
                <Redirect to="/" />
              </Switch>
            );
      }
      return (
        <div className="App">
          <Layout>{routes}</Layout>
        </div>
      );
  }

}

const mapStateToProps = (state) => {
  return {
    isAuth: state.user.token !== null,
    token : state.user.token
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTrySignIn : () => {
      dispatch(authCheckState())
    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
