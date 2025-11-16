import { IsString } from "class-validator";
import {
  // ObjectType,
  // InterfaceType,
  Field,
  InputType,
} from "type-graphql";

// @InterfaceType()

// If used as a return type
// @ObjectType()

// If used as an input argument
@InputType()
export class ListNotesParams {
  @Field({ nullable: true })
  @IsString()
  search?: string;
}

// results :
// type ListNotesParams = {
//   search?: string
// }

// Source:
// https://typegraphql.com/docs/validation.html
// https://typegraphql.com/docs/types-and-fields.html
