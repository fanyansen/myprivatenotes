"use client";
import { useForm } from "react-hook-form";
import { SchemaLogin } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { useLoginSiniMutation } from "../../../generated/graphql";
import { isAuthenticated, saveToken } from "../../../lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function LoginPage() {
  const router = useRouter();
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

    const accessToken = loginResponseData?.login?.access_token;
    if (accessToken) {
      saveToken(accessToken);
      router.push("/");
    }
  };

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/");
    }
  }, []);

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
      hello
    </>
  );
}

export default LoginPage;
