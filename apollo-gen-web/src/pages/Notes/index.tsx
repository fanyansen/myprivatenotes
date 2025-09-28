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

  return <div>Notes</div>;
}

export default memo(Notes);
