import { useForm } from "react-hook-form";
import { NoteSchema } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import {
  ListNotesDocument,
  useAddNewNoteMutation,
  useNoteByIdQuery,
  useUpdateNoteMutation,
} from "../../../../../generated/graphql";
import { use, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const useManageNote = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = params ? use(params) : { id: undefined };
  const pathname = usePathname();
  const router = useRouter();

  // mutation to add new note
  const [addNote] = useAddNewNoteMutation();

  // mutation to update note can be added here
  const [updateNote] = useUpdateNoteMutation();

  // fetch note by id if id exists
  const { data: noteData } = useNoteByIdQuery({
    variables: { id: id! },
    skip: !id,
  });

  const addNoteForm = useForm<NoteSchema>({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const {
    setValue,
    getValues,
    register,
    formState: { errors },
    handleSubmit,
  } = addNoteForm;

  const isEditPage = Boolean(id && pathname.includes("edit"));

  useEffect(() => {
    if (isEditPage && noteData) {
      setValue("title", noteData.getNoteById.title);
      setValue("content", noteData.getNoteById.content);
    }
  }, [id, noteData, setValue, isEditPage]);

  const onSubmit = async (data: NoteSchema) => {
    try {
      const upsertNote = async () => {
        if (id && isEditPage) {
          // update note logic can be added here
          const editNote = await updateNote({
            variables: {
              id: id,
              title: data.title,
              content: data.content,
            },
          });

          return editNote.data?.updateNote;
        } else {
          const addNewNote = await addNote({
            variables: {
              title: data.title,
              content: data.content,
            },
          });

          return addNewNote.data?.addNote;
        }
      };

      const note = await upsertNote();

      // const { listNotes } = client.readQuery({ query: ListNotesDocument });

      // // Update Local store with updated List Notes after Edit or Create New Note in apollo client
      // client.writeQuery({
      //   query: ListNotesDocument,
      //   data: {
      //     listNotes: [note, ...listNotes],
      //   },
      // });

      router.push("/notes");
      return note;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitForm = handleSubmit(onSubmit);

  return {
    addNoteFormControl: {
      setValue,
      getValues,
      register,
      handleSubmitForm,
      errors,
    },
  };
};

export default useManageNote;
