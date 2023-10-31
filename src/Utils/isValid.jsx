const isvalid = (state, action) => {
  const userNameRegex = /^[\w][\w_.-]{3,29}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_=+-]).{8,}$/;
  const emailRegex = /^[\w]+@[a-zA-Z]{3,5}\.[A-Za-z]{2,3}$/;

  const useNameIsValid =
    state.typeInput == "password"
      ? passwordRegex.test(action.value)
      : state.typeInput == "text"
      ? userNameRegex.test(action.value)
      : state.typeInput == "email"
      ? emailRegex.test(action.value)
      : false;

  return useNameIsValid;
};

export default isvalid;
