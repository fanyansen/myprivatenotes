import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Note } from "../entity/Note";
import { isAuth } from "../helpers/isAuth";
import { MyContext } from "./UserResolver";
import { User } from "../entity/User";

@Resolver()
export class NoteResolver {
  @Query(() => [Note])
  @UseMiddleware(isAuth)
  async listNotes() {
    return Note.find({ relations: ["created_by"] });
  }

  @Mutation(() => Note)
  @UseMiddleware(isAuth)
  async addNote(
    @Arg("title") title: string,
    @Arg("content") content: string,
    @Ctx() ctx: MyContext
  ) {
    try {
      const user = await User.findOne({
        where: { id: ctx.tokenPayload?.userId },
      });
      // if (!user) {
      //   throw new Error("User not found");
      // }

      // const newNote = await Note.insert({
      //   title,
      //   content,
      //   created_by: user
      // })
      const newNote = new Note();
      newNote.title = title;
      newNote.content = content;
      newNote.created_by = user!;

      await newNote.save();
      return newNote;
    } catch (error) {
      const catchError = error as Error;
      throw new Error(catchError.message);
    }
  }

  @Mutation(() => Note)
  @UseMiddleware(isAuth)
  async updateNote(
    @Arg("title") title: string,
    @Arg("content") content: string,
    @Arg("noteId") noteId: string
  ) {
    try {
      // const updateNote = await Note.update(noteId, {
      //   title,
      //   content
      // })

      const note = await Note.findOne({
        where: { id: noteId },
        relations: ["created_by"],
      });
      // if(!note) throw new Error(" Note not found")
      note!.title = title;
      note!.content = content;

      await note?.save();
      return note;
    } catch (error) {
      const catchError = error as Error;
      throw new Error(catchError.message);
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteNote(@Arg("noteId") noteId: string) {
    try {
      // const deleteNote = await Note.delete(noteId)

      const note = await Note.findOne({
        where: { id: noteId },
        relations: ["created_by"],
      });

      await note?.remove();
      return true;
    } catch (error) {
      const catchError = error as Error;
      throw new Error(catchError.message);
    }
  }
}
