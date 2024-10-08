import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const FAKE_USER = {
  email: "sagar@example.com",
  password: "P@ssw0rd",
};

const initialState = {
  user: {
    email: "",
    password: "",
    name: localStorage.getItem("userName") ?? "",
    avatar: "https://i.pravatar.cc/100?u=ss",
  },
  isAuthenticated: JSON.parse(localStorage.getItem("isAuth")) ?? false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "user/logged-in": {
      const { email, password } = action.payload;
      return {
        ...state,
        user: {
          ...state.user,
          email,
          password,
          name: `${email.at(0).toUpperCase()}${email.slice(
            1,
            email.indexOf("@")
          )}`,
        },
        isAuthenticated: true,
      };
    }

    case "login/error":
      return { ...initialState, error: action.payload };

    case "user/logged-out":
      // return {...initialState, isAuthenticated: false};
      return initialState;

    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (!email === FAKE_USER.email && !password === FAKE_USER.password) {
      dispatch({
        type: "login/error",
        payload: "Email or Password is incorrect",
      });
      return;
    }

    dispatch({ type: "user/logged-in", payload: { email, password } });
    localStorage.setItem("isAuth", JSON.stringify(true));
    localStorage.setItem(
      "userName",
      `${email.at(0).toUpperCase()}${email.slice(1, email.indexOf("@"))}`
    );
  }
  function logout() {
    localStorage.clear();
    dispatch({ type: "user/logged-out" });
  }

  return (
    <AuthContext.Provider
      value={{ login, logout, user, isAuthenticated, error }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("AuthContext was used outside of AuthProvider");

  return context;
}

export { useAuth, AuthProvider };
