import React, { useReducer, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../../../store/actions/user";
import InputText from "../../UI/InputText/InputText";
import Message from "../../UI/Message/Message";
import "./FormLogin.css";
import { Redirect } from "react-router-dom";

const FORM_INPUT_VALIDATE = "FORM_INPUT_VALIDATE";
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_VALIDATE) {
    const updateValues = {
      ...state.inputsValues,
      [action.input]: action.value
    };
    const updateValidities = {
      ...state.inputsValidities,
      [action.input]: action.isValid
    };
    let updateFormIsValid = true;
    for (const key in updateValidities) {
      updateFormIsValid = updateFormIsValid && updateValidities[key];
    }
    return {
      inputsValues: updateValues,
      inputsValidities: updateValidities,
      formIsValid: updateFormIsValid
    };
  }
  return state;
};
const FormLogin = props => {
    const dispatch = useDispatch();
    const loginErrors = useSelector(state => state.user.loginErrors);
    const hasErrors = useSelector(state => state.user.hasErrors);
    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitClicked, setSubmitClicked] = useState(false);
    const [formState, dispatchFromState] = useReducer(formReducer, {
      inputsValues: {
        email: "",
        password: ""
      },
      inputsValidities: {
        email: false,
        password: false
      },
      formIsValid: false
    });
    const inputChangeHandler = useCallback(
      (inputIdentifier, inputValue, inputValidity) => {
        dispatchFromState({
          type: FORM_INPUT_VALIDATE,
          isValid: inputValidity,
          value: inputValue,
          input: inputIdentifier
        });
      },
      [dispatchFromState]
    );
      const submitHandler = async () => {
        if (!formState.formIsValid) {
          setSubmit(false);
          setSubmitClicked(true);
          return;
        }
        setLoading(true);
        await dispatch(
          loginUser(
            formState.inputsValues.email,
            formState.inputsValues.password
          )
        );
         setLoading(false);
         setSubmit(true);
       return <Redirect to="/" />
      };
       let MessageComponent;
       if (!hasErrors && submit) {
         MessageComponent = (
           <Message nameClass="success">
             <li>
               {" "}
               you have signed up successfully, We have sent an email with a
               confirmation link to your email address
             </li>
           </Message>
         );
       } else if (hasErrors && submit) {
         let i = 0;
         MessageComponent = (
           <Message nameClass="errors">
             {loginErrors[0].errors.map(error => {
               i++;
               return <li key={i}>{error.msg}</li>;
             })}
           </Message>
         );
       }
  return (
    <div className="login">
      {MessageComponent}
      <div className="login-title">
        <p>-- Login --</p>
      </div>
      <div className="container-auth">
        <div className="form-style">
          {/*Email */}
          <div className="form-group row">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              Email:
            </label>
            <div className="col-sm-10">
              <InputText
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                errorText="Please enter a valid email address"
                value={formState.inputsValues.email}
                onInputChange={inputChangeHandler}
                initialValue=""
                initiallyValid={false}
                required
                email
              />
            </div>
          </div>
          {/**Password */}
          <div className="form-group row">
            <label htmlFor="password" className="col-sm-2 col-form-label">
              Password:
            </label>
            <div className="col-sm-10">
              <InputText
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                errorText="must be at least 6 chars long"
                value={formState.inputsValues.password}
                onInputChange={inputChangeHandler}
                initialValue=""
                initiallyValid={false}
                required
                minLength={6}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-10">
              <button
                type="button"
                className="btn btn-warning mb-2"
                onClick={submitHandler}
              >
                Login
              </button>
              {loading && "Loading..."}
              {!submit && submitClicked && (
                <p className="errorText">Please, fill all inputs correctly</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
