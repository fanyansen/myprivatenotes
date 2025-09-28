import React from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SchemaLogin } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { useLoginSiniMutation } from "../../../generated/graphql";
import { isAuthenticated, saveToken } from "../../../lib/auth";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaLogin>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const [mutateLogin, { data, error, reset }] = useLoginSiniMutation();

  const onSubmit = async (data: SchemaLogin) => {
    const loginRes = await mutateLogin({
      variables: { ...data },
      errorPolicy: "all",
    });

    const { data: loginResponseData } = loginRes;

    saveToken(loginResponseData?.login?.access_token!);

    return <Navigate to="/" />;
  };

  if (isAuthenticated()) {
    return <Navigate to="/" />;
  }

  console.log(errors);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email")}
          onChange={(e) => {
            register("email").onChange(e);
            reset();
          }}
        />

        <input
          {...register("password")}
          onChange={(e) => {
            register("password").onChange(e);
            reset();
          }}
          type="password"
        />

        <input type="submit" />
      </form>
      <p>{errors.email?.message}</p>
      <p>{errors.password?.message}</p>
      {data && <p>Login Successful</p>}
      <p>{error?.message}</p>
    </>
  );
}

export default LoginPage;
