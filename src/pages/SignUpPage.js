import React, { useEffect } from "react";
import { Label } from "components/label";
import { Input } from "components/input";
import { Field } from "components/field";
import { useForm } from "react-hook-form";
import { Button } from "components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "firebase-app/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import AuthenticationPage from "./AuthenticationPage";
import InputPasswordToggle from "components/input/InputPasswordToggle";
import slugify from "slugify";
import { userRole, userStatus } from "utils/constants";

const schema = yup.object({
  fullname: yup.string().required("Please enter your fullname"),
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleSignUp = async (values) => {
    if (!isValid) return;
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
      photoURL:
        "https://firebasestorage.googleapis.com/v0/b/monkey-blogging-3a153.appspot.com/o/images%2F1946429.png?alt=media&token=5971d231-4854-4a94-8864-881dba5a2ffd",
    });

    //Dùng setDoc để đặt userId trùng với id phần lưu trữ
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      username: slugify(values.fullname, { lower: true }),
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/monkey-blogging-3a153.appspot.com/o/images%2F1946429.png?alt=media&token=5971d231-4854-4a94-8864-881dba5a2ffd",
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createdAt: serverTimestamp(),
    });

    toast.success("Sign up successfully!!!");
    navigate("/");
  };

  console.log(errors);
  console.log(Object.values(errors));

  useEffect(() => {
    const arrErroes = Object.values(errors);
    if (arrErroes.length > 0) {
      toast.error(arrErroes[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);

  useEffect(() => {
    document.title = "Register Page";
  });

  return (
    <AuthenticationPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignUp)}
        autoComplete="off"
      >
        <Field className="field">
          <Label htmlFor="fullname">Fullname</Label>
          <Input
            type="text"
            name="fullname"
            placeholder="Enter your fullname"
            control={control}
          ></Input>
        </Field>

        <Field className="field">
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            control={control}
          ></Input>
        </Field>

        <Field className="field">
          <Label htmlFor="password">Password</Label>
          <InputPasswordToggle
            name="password"
            placeholder="Enter your password"
            control={control}
          ></InputPasswordToggle>
        </Field>

        <Field className="field">
          <Label htmlFor="passwordConfirmation">Confirm your password</Label>
          <InputPasswordToggle
            name="passwordConfirmation"
            placeholder="Re-enter your password"
            control={control}
          ></InputPasswordToggle>
        </Field>

        <div className="have-account">
          You already an account? <NavLink to="/sign-in">Login</NavLink>
        </div>

        <Button
          type="submit"
          style={{
            width: "100%",
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

export default SignUpPage;
