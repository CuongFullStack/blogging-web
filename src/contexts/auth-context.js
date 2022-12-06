////Dùng context để lưu giá trị của user khi đăng nhập, đăng kí, đăng xuất truyền vào component
//// const { createContext, useContext } = require("react");
// import { createContext, useContext } from "react";
// const AuthContext = createContext();
// function AuthProvider(props) {
//   return <AuthContext.Provider {...props}></AuthContext.Provider>;
// }
// function useAuth() {
//   const context = useContext(AuthContext);
//   if (typeof context === "undefined") {
//     throw new Error("useAuth must be used within AuthProvider");
//   }
//   return context;
// }
// export { AuthProvider, useAuth };

import { auth } from "firebase-app/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();

function AuthProvider(props) {
  const [userInfo, setUserInfo] = useState({});
  const value = { userInfo, setUserInfo };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserInfo(user);
    });
  }, []);
  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined") {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
