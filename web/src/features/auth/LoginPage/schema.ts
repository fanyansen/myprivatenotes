import * as Yup from "yup";
import { EMAIL_REGEX } from "../../../constants/signup";

export const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .matches(EMAIL_REGEX, "Invalid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter"),
  // .matches(/[0-9]/, "Password must contain at least one number")
  // .matches(
  //   /[!@#$%^&*]/,
  //   "Password must contain at least one special character"
  // ),
});
