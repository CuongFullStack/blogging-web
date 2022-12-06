import { Button } from "components/button";
import { Field } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { useAuth } from "contexts/auth-context";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import AuthenticationPage from "./AuthenticationPage";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { IconEyeClose, IconEyeOpen } from "components/icon";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase-app/firebase-config";
const schema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email"),
  password: yup.string().required("Please enter your password"),
});
const SignInPage = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const { userInfo } = useAuth();
  useEffect(() => {
    const arrErroes = Object.values(errors);
    if (arrErroes.length > 0) {
      document.title = "Login Page";
      toast.error(arrErroes[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo?.email) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignIn = async (values) => {
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password);
    navigate("/");
  };

  const [togglePassword, setTogglePassword] = useState(false);

  return (
    <AuthenticationPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignIn)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            name="email"
            placeholder="Enter your email address"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            type={togglePassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            control={control}
          >
            {!togglePassword ? (
              <IconEyeClose
                onClick={() => setTogglePassword(true)}
              ></IconEyeClose>
            ) : (
              <IconEyeOpen
                onClick={() => setTogglePassword(false)}
              ></IconEyeOpen>
            )}
          </Input>
        </Field>
        <div className="have-account">
          You have no had an account?{" "}
          <NavLink to="/sign-up">Register an account</NavLink>
        </div>
        <Button
          type="submit"
          style={{
            maxWidth: "300px",
            margin: "0 auto",
          }}
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Sign up
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;
