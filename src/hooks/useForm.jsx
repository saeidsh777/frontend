import { useReducer } from "react";

const validHandler = (state, action) => {
  switch (action.type) {
    case "GET_VALUE": {
      let isValidForm = true;
      for (const idName in state.inputs) {
        if (idName === action.inputID) {
          isValidForm = isValidForm && action.isValid;
        } else {
          isValidForm = isValidForm && state.inputs[idName].isValidInput;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputID]: {
            value: action.inputValue,
            isValidInput: action.isValid,
          },
        },
        isValidForm: isValidForm,
      };
    }
  }
};

export const useForm = (initInputs, initValid) => {
  const [formState, dispatch] = useReducer(validHandler, {
    inputs: initInputs,
    isValidForm: initValid,
  });

  const onValidHandled = (id, inputValue, isValid) => {
    dispatch({
      type: "GET_VALUE",
      inputValue,
      isValid,
      inputID: id,
    });
  };

  return [formState, onValidHandled];
};
