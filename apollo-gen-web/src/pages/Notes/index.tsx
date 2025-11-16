import React, { memo, useEffect } from "react";
import {
  useDeleteNoteMutation,
  useListNotesLazyQuery,
  useListNotesQuery,
} from "../../generated/graphql";
import { Link } from "react-router-dom";

function Notes() {
  const { data, loading, error, refetch } = useListNotesQuery();
  // const [, { data, loading, error, refetch }] = useListNotesLazyQuery();

  const [deleteNote, deleteState] = useDeleteNoteMutation({
    onCompleted: () => refetch(),
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  // console.log("useListNotesQuery()", useListNotesQuery());
  // console.log("useDeleteNoteMutation()", useDeleteNoteMutation());
  // console.log("deleteNoteRes", deleteNoteRes);
  console.log("deleteState", deleteState);
  // console.log(data);
  // console.log(error);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <p>All Notes</p>
      <Link to="/notes/new">
        <button>Create New Note</button>
      </Link>
      <br />
      {data?.listNotes?.map((note) => (
        <div key={note?.id}>
          <h3>Title: {note?.title}</h3>
          <p>Content: {note?.content}</p>
          <p>Created by: {note?.created_by?.email}</p>
          <p>Created at: {new Date(note?.created_at!).toLocaleString()}</p>
          <p>
            <Link to={`/notes/edit/${note?.id}`}>
              <button>Edit Note</button>
            </Link>

            <button
              onClick={() => {
                deleteNote({ variables: { id: note?.id } });
              }}
            >
              Delete Note
            </button>
          </p>
          <hr />
        </div>
      ))}
      {error || ""}
      <br />
    </>
  );
}

export default memo(Notes);
