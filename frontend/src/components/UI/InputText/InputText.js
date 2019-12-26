import React, { useReducer, useEffect } from "react";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";
const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true
      };
    default:
      return state;
  }
};

const InputText = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
      value: props.initialValue ? props.initialValue : "",
      isValid: props.initiallyValid,
      touched: false
    });
    const { onInputChange, id } = props;
    useEffect(() => {
      if (inputState.touched) {
        onInputChange(id, inputState.value, inputState.isValid);
      }
    }, [inputState, onInputChange, id]);
    const textChangeHandler = text => {
    const LinkRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?‌​[\w?‌​=]*)?/;
    const emailRegex =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
        isValid = false;
      }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.id ==="link" && !LinkRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    if (props.confirmPassword && text !== props.confirmPassword) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
    };
    const lostFocusHandler = () => {
      dispatch({ type: INPUT_BLUR });
    };
    let borderColor =''
    if (!inputState.isValid && inputState.touched) {
        borderColor = "borderColor";
    }
    let sizeInput = props.sizeInput ? "sizeInput":"";
    let input =''
    if (
      props.type === "text" ||
      props.type === "email" ||
      props.type === "password"
    ) {
      input = (
        <input
          type={props.type}
          className={"form-control " + borderColor + " " + sizeInput}
          id={props.id}
          name={props.name}
          placeholder={props.placeholder}
          value={inputState.value}
          onChange={event => {
            textChangeHandler(event.target.value);
          }}
          onBlur={lostFocusHandler}
        />
      );
    }else if (props.type === 'select') {
      input = (
        <select
          className="form-control select-county"
          id={props.id}
          name={props.name}
          defaultValue={props.initialValue}
          onChange={event => {
            textChangeHandler(event.target.value);
          }}
          onFocus={lostFocusHandler}
        >
          {props.COUNTRIES.map(country => {
            return (
              <option key={country} value={country}>
                {country}
              </option>
            );
          })}
        </select>
      );
    }else if (props.type === "textarea") {
      input = (
        <textarea
          className={"form-control " + borderColor}
          id={props.id}
          name={props.name}
          placeholder={props.placeholder}
          value={inputState.value}
          rows={4}
          onChange={event => {
            textChangeHandler(event.target.value);
          }}
          onBlur={lostFocusHandler}
        />
      );
    }
    return (
      <div>
        {input}
        {!inputState.isValid && inputState.touched && (
          <p className="errorText">{props.errorText}</p>
        )}
      </div>
    );
}

export default InputText