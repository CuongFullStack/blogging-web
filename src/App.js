// import SignInPage from "pages/SignInPage";
import HomePage from "pages/HomePage";
import SignInPage from "pages/SignInPage";
import SignUpPage from "pages/SignUpPage";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
// import SignUpPage from "pages/SignUpPage";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
