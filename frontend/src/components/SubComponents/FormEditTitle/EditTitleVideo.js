import React, {useReducer, useCallback, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { editVideoAction, deleteVideoAction } from '../../../store/actions/videos';
import InputText from "../../UI/InputText/InputText";
import { Redirect } from "react-router-dom";
import "./EditTitleVideo.css";


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
const EditTitleVideo = props => {
  const dispatch = useDispatch()
  const [redirect, setRedirect] = useState(false);
  const currentVideo = useSelector(state => state.videos.currentVideo);
  const token = useSelector(state => state.user.token);
  const [formState, dispatchFromState] = useReducer(formReducer, {
    inputsValues: {
      title: currentVideo.video[0].title
    },
    inputsValidities: {
      title: true
    },
    formIsValid: true
  });
  const inputChangeHandler = useCallback(
    async (inputIdentifier, inputValue, inputValidity) => {
      await dispatchFromState({
        type: FORM_INPUT_VALIDATE,
        isValid: inputValidity,
        value: inputValue,
        input: inputIdentifier
      });
    },
    [dispatchFromState]
  );
  const editHandler = async () => {
    if (!formState.formIsValid) {
      return;
    }
    await dispatch(editVideoAction(formState.inputsValues.title, currentVideo.video[0].id_video, token));
    props.onedit()
  };
  const deleteHandler = async () => {
    await dispatch(deleteVideoAction(currentVideo.video[0].id_video, token));
    props.onedit()
  };

  const playHandler = () => {
    setRedirect(true)
  }

  if (redirect) {
    return <Redirect to={"/watch/" + currentVideo.video[0].id_video} />;
  }
  return (
    <div className="edit-title-container">
      <div className="edit-title">
        <p className="title-label">Title:</p>
        <InputText
          type="text"
          id="title"
          name="title"
          errorText="Please, Enter a valid title"
          placeholder="Title"
          value={formState.inputsValues.title}
          onInputChange={inputChangeHandler}
          initialValue={currentVideo.video[0].title}
          initiallyValid={true}
          minLength={5}
          required
          sizeInput
        />
      </div>
      <div className="container-btn">
        <button onClick={deleteHandler} className="btn btn-danger btn-crud ">
          <i className="fas fa-trash-alt"></i>
        </button>
        <button
          type="button"
          onClick={editHandler}
          className="btn btn-success btn-crud"
        >
          <i className="fas fa-edit"></i>
        </button>
        <button onClick={playHandler} className="btn btn-danger btn-crud">
          <i className="fas fa-play"></i>
        </button>
      </div>
    </div>
  );
};

export default EditTitleVideo;
