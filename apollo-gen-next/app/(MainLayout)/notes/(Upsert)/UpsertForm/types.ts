import * as Yup from "yup";
import { schema } from "./schema";

export type NoteSchema = Yup.InferType<typeof schema>;
