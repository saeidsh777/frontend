import React, { useEffect, useReducer } from "react";
import isvalid from "../../Utils/isValid";

import "./Input.css";

const setValue = (state, action) => {
  switch (action.type) {
    case "CHANGE-INPUT": {
      return {
        ...state,
        value: action.value,
        isValid: isvalid(state, action),
      };
    }

    case "CHANGE-AREA": {
      return {
        ...state,
        value: action.value,
        isValid: true,
      };
    }

    default:
      state;
  }
};
export default function Input(props) {
  const [mainInput, dispatch] = useReducer(setValue, {
    value: "",
    isValid: false,
    typeInput: props.type,
  });

  const { value} = mainInput

  const playAudioValid =() => {
    const audioSuccses = new Audio(
      "/src/assets/audio/success.mp3"
    );
    audioSuccses.play()

  }
  const playAudioError =() => {
    const audioSuccses = new Audio(
      "/src/assets/audio/error.mp3"
    );
    audioSuccses.play()
  }

  useEffect(() => {
    props.onValidHandled(props.id,value, mainInput.isValid)
  },[value])

  useEffect(() => {
    mainInput.isValid ? playAudioValid() : playAudioError();
  },[mainInput.isValid])

  return (
    <div>
      {props.typeName === "input" ? (
        <input
          className={`${props.className} ${
            mainInput.isValid ? "success" : "error"
          }`}
          type={props.type}
          placeholder={props.placeholder}
          onChange={(e) => {
            dispatch({ type: "CHANGE-INPUT", value: e.target.value });
          }}
          value={value}
        />
      ) : (
        <textarea
          className={`${props.className} ${mainInput.isVali ? ".su" : "e"}`}
          placeholder={props.placeholder}
          onChange={(e) =>
            dispatch({ type: "CHANGE-AREA", value: e.target.value })
          }
          value={value}
        ></textarea>
      )}
    </div>
  );
}
