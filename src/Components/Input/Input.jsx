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
    case "CHANGE-INPUT-NO-VALID": {
      return {
        ...state,
        value: action.value,
        isValid: true,
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

  const { value } = mainInput;

  useEffect(() => {
    props.onValidHandled(props.id, value, mainInput.isValid);
  }, [value]);

  return (
    <div>
      {props.typeName === "input" && (
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
      )}

      {props.typeName === "teaxtarea" && (
        <textarea
          className={`${props.className} ${mainInput.isVali ? ".su" : "e"}`}
          placeholder={props.placeholder}
          onChange={(e) =>
            dispatch({ type: "CHANGE-AREA", value: e.target.value })
          }
          value={value}
        ></textarea>
      )}

      {props.typeName === "input-no-valid" && (
        <input
          type={props.type}
          placeholder={props.placeholder}
          onChange={(e) => {
            dispatch({ type: "CHANGE-INPUT-NO-VALID", value: e.target.value });
          }}
          value={value}
        />
      )}
    </div>
  );
}
