export const SIGNUP_USER = "ADD_USER";
export const LOGIN_USER = "LOGIN_USER";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const AUTH_SUCCESS = "AUTH_SUCCESS";

const HOST = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_PORT_SERVER}`;
export const signUpUser = (first_name, last_name, url_avatar, country, address, email, password, passwordConfirmation ) => {
    return async dispatch => {
        const response = await fetch(`${HOST}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            first_name,
            last_name,
            url_avatar,
            country,
            address,
            email,
            password,
            passwordConfirmation
          })
        });
        let resData;
        if (response.status !== 200) {
            resData = await response.json();
        }
       // console.log(resData)
        dispatch({
          type: SIGNUP_USER,
          status: response.status,
          resData: resData
        });

    }
};
export const authSuccess = (idToken, userId) => {
  return {
    type: AUTH_SUCCESS,
    token: idToken,
    userId: userId
  };
};
export const authCheckState = () => {
    return  dispatch => {
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate < new Date()){
                dispatch(logout())
            }else{
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime())) )
            }

        }
    }
}
export const checkAuthTimeOut = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: AUTH_LOGOUT
  };
};
export const loginUser = (email, password) => {
  return async dispatch => {
    const response = await fetch(`${HOST}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    const resData = await response.json();
    if(response.status === 422){
      dispatch({
        type: LOGIN_USER,
        status: response.status,
        resData: resData
      });
    }else{
      const expirationDate = new Date(new Date().getTime() + resData.expiresIn);
      localStorage.setItem("token", resData.token);
      localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("userId", resData.userId);
      /*
    console.log("token :::: ",  (new  Date())*1);
    console.log("token :::: ",  expirationDate*1);*/

      dispatch({
        type: LOGIN_USER,
        status: response.status,
        resData: resData
      });
      dispatch(checkAuthTimeOut(resData.expiresIn));

    }
  }
}