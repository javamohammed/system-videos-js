import React, { useReducer, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { signUpUser } from "../../../store/actions/user";
import { Countries } from "../../../models/Countries";
import InputText from "../../UI/InputText/InputText";
import Message from "../../UI/Message/Message";
import "./FormSignUp.css";

/**
 {
    "first_name": "AouldBouchta",
    "last_name": "Mohammed",
    "country": "Morocco",
    "address": "Beni makada",
    "email": "java@gmail.com",
    "password": "000000",
 }
 */


const COUNTRIES = [...Countries]
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
const FormSignUp = props => {
  const signUpErrors = useSelector(state => state.user.signUpErrors);
  const hasErrors = useSelector(state => state.user.hasErrors);
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [formState, dispatchFromState] = useReducer(formReducer, {
    inputsValues: {
      first_name: "",
      last_name: "",
      address: "",
      email: "",
      password: "",
      confirm_password:"",
      country:""
    },
    inputsValidities: {
      first_name: false,
      last_name: false,
      address: false,
      email: false,
      password: false,
      confirm_password: false,
      country:false
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
    setLoading(true)
    await dispatch(
      signUpUser(
        formState.inputsValues.first_name,
        formState.inputsValues.last_name,
        "",
        formState.inputsValues.country,
        formState.inputsValues.address,
        formState.inputsValues.email,
        formState.inputsValues.password,
        formState.inputsValues.confirm_password
      )
    );
    setLoading(false)
    setSubmit(true);
   // inputChangeHandler("first_name", "", false);
  };
  let MessageComponent ;
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
               {signUpErrors[0].errors.map(error => {
                 i++;
                 return <li key={i}>{error.msg}</li>;
               })}
             </Message>
           );
         }
  return (
    <div className="signup">
      {MessageComponent}

      {!hasErrors && submit ? (
        ""
      ) : (
        <div>
          <div className="signup-title">
            <p>-- Sign-Up --</p>
          </div>
          <div className="container-signup">
            <form>
              {/*First Name*/}
              <div className="form-group row">
                <label htmlFor="first_name" className="col-sm-2 col-form-label">
                  First Name:
                </label>
                <div className="col-sm-10">
                  <InputText
                    type="text"
                    id="first_name"
                    name="first_name"
                    placeholder="First Name"
                    errorText="Please, First Name is required"
                    value={formState.inputsValues.first_name}
                    onInputChange={inputChangeHandler}
                    initialValue=""
                    initiallyValid={false}
                    required
                  />
                </div>
              </div>
              {/*Last Name*/}
              <div className="form-group row">
                <label htmlFor="last_name" className="col-sm-2 col-form-label">
                  Last Name:
                </label>
                <div className="col-sm-10">
                  <InputText
                    type="text"
                    id="last_name"
                    name="last_name"
                    placeholder="Last Name"
                    errorText="Please, Last Name is required"
                    value={formState.inputsValues.last_name}
                    onInputChange={inputChangeHandler}
                    initialValue=""
                    initiallyValid={false}
                    required
                  />
                </div>
              </div>
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
              {/**Confirm Password */}
              <div className="form-group row">
                <label
                  htmlFor="confirm_password"
                  className="col-sm-2 col-form-label"
                >
                  Confirm Password:
                </label>
                <div className="col-sm-10">
                  <InputText
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    placeholder="Confirm Password"
                    errorText="Please, Enter the same password above"
                    value={formState.inputsValues.confirm_password}
                    onInputChange={inputChangeHandler}
                    initialValue=""
                    initiallyValid={false}
                    required
                    confirmPassword={formState.inputsValues.password}
                    minLength={6}
                  />
                </div>
              </div>
              {/**Country */}
              <div className="form-group row">
                <label htmlFor="country" className="col-sm-2 col-form-label">
                  Country:
                </label>
                <div className="col-sm-10">
                  <InputText
                    type="select"
                    id="country"
                    name="country"
                    errorText="Please, select your country"
                    value={formState.inputsValues.country}
                    onInputChange={inputChangeHandler}
                    initialValue=""
                    COUNTRIES={COUNTRIES}
                    initiallyValid={false}
                    required
                  />
                </div>
              </div>
              {/**Address */}
              <div className="form-group row">
                <label htmlFor="address" className="col-sm-2 col-form-label">
                  Address:
                </label>
                <div className="col-sm-10">
                  <InputText
                    type="textarea"
                    id="address"
                    name="address"
                    errorText="Please, select your address"
                    value={formState.inputsValues.address}
                    onInputChange={inputChangeHandler}
                    initialValue=""
                    initiallyValid={false}
                    required
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
                    Sign up
                  </button>{loading && "Loading..."}
                  {!submit && submitClicked && (
                    <p className="errorText">
                      Please, fill all inputs correctly
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormSignUp;
