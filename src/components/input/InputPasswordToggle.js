import { IconEyeClose, IconEyeOpen } from "components/icon";
import React, { Fragment, useState } from "react";
import Input from "./Input";

const InputPasswordToggle = ({
  control,
  name = "password",
  placeholder = "Enter your password",
}) => {
  const [togglePassword, setTogglePassword] = useState(false);
  if (!control) return null;
  return (
    <Fragment>
      <Input
        type={togglePassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        control={control}
      >
        {!togglePassword ? (
          <IconEyeClose onClick={() => setTogglePassword(true)}></IconEyeClose>
        ) : (
          <IconEyeOpen onClick={() => setTogglePassword(false)}></IconEyeOpen>
        )}
      </Input>
    </Fragment>
  );
};

export default InputPasswordToggle;
