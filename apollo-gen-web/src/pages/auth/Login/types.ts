import * as Yup from "yup";
import { schema } from "./schema";

export type SchemaLogin = Yup.InferType<typeof schema>;

// export type UserLogin = Yup.InferType<typeof schema>;
// export interface UserLogin extends SchemaLogin {
//   // mutate: Promise<LoginResponse>;
// }
