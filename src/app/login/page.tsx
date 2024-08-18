"use client";

import { post_login } from "@/api";
import BackgroundImageContainer from "@/components/common/BackgroundImageContainer";
import FormContainer from "@/components/common/FormContainer";
import Input from "@/components/common/Input";
import Typography from "@/components/common/Typography";
import { BACKGROUNDS } from "@/constants/images";
import { strings } from "@/constants/strings";
import { InputValue } from "@/constants/types";
import { UserLoginSchema } from "@/schema/UserSchema";
import { useEffect, useState } from "react";
import { z } from "zod";

type Props = {};

const Login = (props: Props) => {
  const [formEmail, setFormEmail] = useState<InputValue>();
  const [formPassword, setFormPassword] = useState<InputValue>();
  const [disabled, setDisabled] = useState<boolean>();

  useEffect(() => {
    if (formEmail?.error || formPassword?.error) {
      console.log(formEmail?.error, formPassword?.error);
      setDisabled(true);
      return;
    }
    setDisabled(false);
  }, [formEmail, formPassword]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newEmail = e.target.value;
    try {
      UserLoginSchema.shape.email.parse(newEmail);
      setFormEmail({ value: newEmail, error: undefined });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFormEmail({ value: newEmail, error: error.errors[0].message });
      }
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newPassword = e.target.value;

    try {
      UserLoginSchema.shape.password.parse(newPassword);
      setFormPassword({ value: newPassword, error: undefined });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFormPassword({ value: newPassword, error: error.errors[0].message });
      }
    }
  };

  const onLoginAsync = async (e: any) => {
    e.preventDefault();
    try {
      if (formEmail?.value && formPassword?.value) {
        const payload = {
          email: formEmail?.value,
          password: formPassword?.value,
        };
        const res = await post_login(payload);
        console.log(res);
      }
    } catch (err) {
      console.error(`Error connecting to path: ${err}`);
    }
  };

  return (
    <BackgroundImageContainer
      className="bg-gradient-to-b from-black/50 to-transparent"
      backgroundImage={BACKGROUNDS.AUTH_IMAGE}
    >
      <Typography className="font-serif text-3xl font-semibold text-white text-center">
        {strings.signup.signIntoAccount}
      </Typography>
      <Typography className="font-serif text-[#D9D9D9] text-lg font-normal text-center">
        {strings.signup.subHeading}
      </Typography>
      <FormContainer onSubmit={onLoginAsync}>
        <Input
          name="email"
          type="email"
          placeholder={strings.signup.emailPlaceholder}
          onChange={handleEmailChange}
        />
        <Input
          name="password"
          type="password"
          placeholder={strings.signup.emailPlaceholder}
          onChange={handlePasswordChange}
        />
        <button type="submit">Save</button>
      </FormContainer>
    </BackgroundImageContainer>
  );
};

export default Login;
