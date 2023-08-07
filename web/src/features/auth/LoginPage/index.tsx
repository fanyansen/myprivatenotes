import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaLogin, UserLogin } from "./type";
import { schema } from "./schema";
import { useAppDispatch, useAppSelector } from "../../../hooks/useReduxHooks";
import { login, selectorState } from "./slice";
import { useLoginSiniMutation } from "../../../generated/graphql";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaLogin>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const [mutate] = useLoginSiniMutation();

  const dispatch = useAppDispatch();
  const loginState = useAppSelector(selectorState);

  const onSubmit = (data: SchemaLogin) => {
    const params: UserLogin = {
      data,
      mutate,
    };
    // mutate({
    //   variables: data,
    //   errorPolicy: "all",
    // });
    // alert(data);
    dispatch(login(params)).then(
      (res) => res.meta.requestStatus === "fulfilled" && navigate("/")
    );
  };

  console.log(loginState);
  console.log(loginState.status);
  console.log(loginState.error);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} />

        <input {...register("password")} />

        <input type="submit" />
      </form>
      <p>{errors.email?.message}</p>
      <p>{errors.password?.message}</p>
      {/* <p>{error?.message}</p> */}
    </>
  );
}

export default LoginPage;
