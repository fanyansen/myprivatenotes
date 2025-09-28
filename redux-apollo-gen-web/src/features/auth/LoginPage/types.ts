import * as Yup from "yup";
import { schema } from "./schema";
import {
  LoginResponse,
  LoginSiniMutation,
  LoginSiniMutationVariables,
} from "../../../generated/graphql";
import { FetchResult, MutationHookOptions } from "@apollo/client";

export type SchemaLogin = Yup.InferType<typeof schema>;

// export type UserLogin = Yup.InferType<typeof schema>;
// export interface UserLogin extends SchemaLogin {
//   // mutate: Promise<LoginResponse>;
// }
export type UserLogin = {
  data: SchemaLogin;
  mutate: (
    options?: MutationHookOptions<LoginSiniMutation, LoginSiniMutationVariables>
  ) => Promise<FetchResult<LoginSiniMutation>>;
};

export type LoginState = {
  loading: boolean;
  status: string;
  data: Partial<LoginResponse>;
  error: string | null;
};
export type LoginRes = {
  access_token: string;
  refresh_token: string;
};
