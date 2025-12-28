"use client";
import React from "react";
import useManageNote from "./hooks";

const ManageNote = (props: { params: Promise<{ id: string }> }) => {
  const {
    addNoteFormControl: { register, handleSubmitForm },
  } = useManageNote(props);

  return (
    <form onSubmit={handleSubmitForm}>
      <p>
        <label htmlFor="title">Title</label>
        <input {...register("title")} type="text" />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea {...register("content")} />
      </p>
      <button type="submit">Save Note</button>
      <hr />
    </form>
  );
};

export default ManageNote;
