import { SIGNUP_USER, LOGIN_USER, AUTH_LOGOUT, AUTH_SUCCESS } from "../actions/user";
const initialState = {
  userId: "",
  token: null,
  first_name: "",
  last_name: "",
  url_avatar: "",
  country: "",
  address: "",
  email: "",
  created_at: "",
  signUpErrors: [],
  loginErrors: [],
  hasErrors: false
};
const userReducer = (state = initialState, action) => {
  let hasErrors = false
  switch (action.type) {
    case SIGNUP_USER:
      let newSignUpErrors;
      if(action.status !== 200){
        newSignUpErrors = [action.resData];
        hasErrors = true
      }
      return {
        ...state,
        signUpErrors: newSignUpErrors,
        hasErrors: hasErrors
      };
    case LOGIN_USER:
       let newLoginErrors;
       if (action.status !== 200) {
         newLoginErrors = [action.resData];
         hasErrors = true;
        }
        let newLogin = {};
        if (action.status === 200) {
          newLogin = {
            token: action.resData.token,
            userId: action.resData.userId,
          };
        }
      return {
        ...state,
        loginErrors: newLoginErrors,
        hasErrors: hasErrors,
        ...newLogin
      };
      case AUTH_SUCCESS:
        return {
          ...state,
          token: action.token,
          userId: action.userId
        };
      case AUTH_LOGOUT:
        return initialState
    default:
      return state
  }
}
export default userReducer