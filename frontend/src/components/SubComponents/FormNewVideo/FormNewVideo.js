import React, {useReducer, useCallback, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVideoAction } from '../../../store/actions/videos';
import InputText from "../../UI/InputText/InputText";
import Message from "../../UI/Message/Message";
import "./FormNewVideo.css";


const FORM_INPUT_VALIDATE = "FORM_INPUT_VALIDATE";
const formReducer = (state, action) => {
  if(action.type === FORM_INPUT_VALIDATE){
      const updateValues = {
        ...state.inputsValues,
        [action.input] : action.value
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
  return state
}
const FormNewVideo = props => {
  const dispatch = useDispatch()
  const videosErrors = useSelector(state => state.videos.videosErrors);
  const token = useSelector(state => state.user.token);
  const hasErrors = useSelector(state => state.videos.hasErrors);
  const [submit, setSubmit] = useState(false)
  const [loading, setLoading] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [formState, dispatchFromState] = useReducer(formReducer, {
    inputsValues: {
      link: "",
      title: ""
    },
    inputsValidities: {
      link: false,
      title: false
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
      setSubmit(false)
      setSubmitClicked(true);
      return;
  }
   setLoading(true);
  await dispatch(
    addVideoAction(
      formState.inputsValues.title,
      formState.inputsValues.link,
      token
    )
  );
  setSubmit(true)
  setLoading(false);
}
      let MessageComponent;
      if (!hasErrors && submit) {
        MessageComponent = (
          <Message nameClass="success">
            <li>
              {" "}
              Your video Adeded with success
            </li>
          </Message>
        );
      } else if (hasErrors && submit) {
        let i = 0;
        MessageComponent = (
          <Message nameClass="errors">
            {videosErrors[0].errors.map(error => {
              i++;
              if (error.msg.includes("token")) {
                // Found world
                return <li key={i}>Please, go to Login :)</li>;
              }
              return <li key={i}>{error.msg}</li>;
            })}
          </Message>
        );
      }
  return (
    <div className="new-video">
      {MessageComponent}
      <div className="new-video-title">
        <p>-- Add New Video --</p>
      </div>
      <div className="container-new-video">
        <form>
          {/*Link Youtube */}
          <div className="form-group row">
            <label htmlFor="link" className="col-sm-2 col-form-label">
              Link Youtube:
            </label>
            <div className="col-sm-10">
              <InputText
                type="text"
                id="link"
                name="link"
                errorText="Please, Enter a valid Link"
                placeholder="Link Youtube"
                value={formState.inputsValues.title}
                onInputChange={inputChangeHandler}
                initialValue=""
                initiallyValid={false}
                required
              />
            </div>
          </div>
          {/**Title */}
          <div className="form-group row">
            <label htmlFor="title" className="col-sm-2 col-form-label">
              Title:
            </label>
            <div className="col-sm-10">
              <InputText
                type="text"
                id="title"
                name="title"
                errorText="Please, Enter a valid title"
                placeholder="Title"
                value={formState.inputsValues.title}
                onInputChange={inputChangeHandler}
                initialValue=""
                initiallyValid={false}
                minLength={10}
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
                Submit
              </button>
              {loading && "Loading..."}
              {!submit && submitClicked && (
                <p className="errorText">Please, fill all inputs correctly</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormNewVideo;
