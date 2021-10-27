import { createContext, ReactNode, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

interface AuthProviderProps {
    children: ReactNode
}

interface userData {
    email: string;
    password: string;
}

interface AuthProviderData {
    authToken: string;
    signIn: (userData: userData) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: AuthProviderProps) => {

  const history = useHistory();
  
  const [authToken, setAuthToken] = useState(
    () => localStorage.getItem("token") || ""
  );

  const signIn = (userData: userData) => {
    axios
      .post("https://kenziehub.herokuapp.com/sessions", userData)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setAuthToken(response.data.token);
        history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  const logout = () => {
    localStorage.clear();
    setAuthToken("");
    history.push("/");
  };

  return (
    <AuthContext.Provider value={{ authToken, logout, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);