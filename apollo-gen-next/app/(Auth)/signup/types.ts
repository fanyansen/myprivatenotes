import * as Yup from "yup";
import { schema } from "./schema";

export type SchemaSignUp = Yup.InferType<typeof schema>;
