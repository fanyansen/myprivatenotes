import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaSignUp, SignUpParams } from "./types";
import { schema } from "./schema";
// import { useNavigate } from "react-router-dom";
import { useDaftarSiniMutation } from "../../../generated/graphql";
import { useAppDispatch, useAppSelector } from "../../../hooks/useReduxHooks";
import { selectorState, signUp } from "./slice";

function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaSignUp>({
    mode: "all",
    resolver: yupResolver(schema),
  });
  // const navigate = useNavigate();

  const [mutate] = useDaftarSiniMutation();

  const dispatch = useAppDispatch();
  const signUpState = useAppSelector(selectorState);

  const onSubmit = (data: SchemaSignUp) => {
    const params: SignUpParams = {
      data,
      mutate,
    };
    // mutate({
    //   variables: data,
    //   errorPolicy: "all",
    // });
    // alert(data);
    dispatch(signUp(params)).then(
      (res) => res.meta.requestStatus === "fulfilled"
    );
  };

  console.log(signUpState);
  console.log(signUpState.status);
  console.log(signUpState.error);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email:</label>
        <br />
        <input {...register("email")} type="text" id="email" />
        <br />
        {errors?.email?.message && <p>{errors?.email?.message}</p>}
        <label htmlFor="password">Password:</label>
        <br />
        <input {...register("password")} type="password" id="password" />
        <br />
        {errors?.password?.message && <p>{errors?.password?.message}</p>}
        <button type="submit">Submit</button>
      </form>
      {signUpState.status === "succeeded" && <p>Sign Up Successful</p>}
      {signUpState.error && <p>{signUpState.error}</p>}
    </>
  );
}

export default SignupPage;
