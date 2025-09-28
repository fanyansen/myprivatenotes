import React, { memo, useEffect } from "react";
import {
  // useListNotesLazyQuery,
  useListNotesQuery,
} from "../../generated/graphql";

function Notes() {
  const { data, loading, error } = useListNotesQuery();
  // const [fetch, { data, loading, error }] = useListNotesLazyQuery();

  // useEffect(() => {
  //   fetch();
  // }, [fetch]);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  console.log(data);
  console.log(error);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>All Notes</div>
      <br />
      {data?.listNotes?.map((note) => (
        <div key={note?.id}>
          <h3>Title: {note?.title}</h3>
          <p>Content: {note?.content}</p>
          <p>Created by: {note?.created_by?.email}</p>
          <p>Created at: {new Date(note?.created_at!).toLocaleString()}</p>
          <hr />
        </div>
      ))}
      <br />
    </>
  );
}

export default memo(Notes);
