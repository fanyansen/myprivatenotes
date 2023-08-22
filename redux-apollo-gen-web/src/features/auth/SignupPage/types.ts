import * as Yup from "yup";
import { schema } from "./schema";
import { FetchResult, MutationHookOptions } from "@apollo/client";
import {
  DaftarSiniMutation,
  DaftarSiniMutationVariables,
} from "../../../generated/graphql";

export type SchemaSignUp = Yup.InferType<typeof schema>;

export type SignUpParams = {
  data: SchemaSignUp;
  mutate: (
    options?: MutationHookOptions<
      DaftarSiniMutation,
      DaftarSiniMutationVariables
    >
  ) => Promise<FetchResult<DaftarSiniMutation>>;
};

export type SignUpState = {
  loading: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  data: Partial<DaftarSiniMutation>;
  error: string | null;
};
