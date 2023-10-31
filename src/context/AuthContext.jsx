import { createContext } from "react";

const AuthContext = createContext({
  autoLogin:null,
  isLoggedIn: false,
  token: null,
  userInfos: {},
  login: () => {},
  logout: () => {},
});

export default AuthContext;
