import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaSignUp } from "./types";
import { schema } from "./schema";
// import { useNavigate } from "react-router-dom";
import { useDaftarSiniMutation } from "../../../generated/graphql";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaSignUp>({
    mode: "all",
    resolver: yupResolver(schema),
  });
  // const navigate = useNavigate();

  const [signUpMutate, { data, error, reset }] = useDaftarSiniMutation();

  const onSubmit = (data: SchemaSignUp) => {
    signUpMutate({
      variables: data,
      errorPolicy: "all",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email:</label>
        <br />
        <input
          {...register("email")}
          id="email"
          onChange={(e) => {
            register("email").onChange(e);
            reset();
          }}
        />
        <br />
        {errors?.email?.message && <p>{errors?.email?.message}</p>}
        <label htmlFor="password">Password:</label>
        <br />
        <input
          {...register("password")}
          type="password"
          id="password"
          onChange={(e) => {
            register("password").onChange(e);
            reset();
          }}
        />
        <br />
        {errors?.password?.message && <p>{errors?.password?.message}</p>}
        <button type="submit">Submit</button>
      </form>
      {data && <p>Sign Up Successful</p>}
      <p>{error?.message}</p>
    </>
  );
}

export default Signup;
