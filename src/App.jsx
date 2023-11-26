import { useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import AuthContext from "./context/AuthContext";
import "./App.css";

const baseURL = "http://localhost:4000/v1/";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userInfos, setUserInfos] = useState(null);
  const [clickBe, setClickBe] = useState(false);

  const router = useRoutes(routes);

  const login = (userInfos, token) => {
    setToken(token);
    setIsLoggedIn(true);
    setUserInfos(userInfos);
    localStorage.setItem("user", JSON.stringify({ token }));
    localStorage.setItem("isLoggedIn", true);
  };

  const logout = () => {
    setToken(null);
    setUserInfos({});
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.setItem("isLoggedIn", false);
  };

  const autoLogin = () => {
    if (localStorage.getItem("isLoggedIn") == "true") {
      const getToken = JSON.parse(localStorage.getItem("user"));
      if (getToken.token) {
        setToken(getToken.token);
        fetch(`${baseURL}auth/me`, {
          headers: {
            Authorization: `Bearer ${getToken.token}`,
          },
        })
          .then((res) => res.json())
          .then((result) => {
            setIsLoggedIn(true);
            setUserInfos(result);
          });
      }
    }
  };

  useEffect(() => {
    autoLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        autoLogin,
        isLoggedIn,
        token,
        userInfos,
        baseURL,
        login,
        logout,
        clickBe,
        setClickBe,
      }}
    >
      {router}
    </AuthContext.Provider>
  );
}
