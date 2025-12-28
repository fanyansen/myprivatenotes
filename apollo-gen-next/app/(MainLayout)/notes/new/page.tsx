import React from "react";
import ManageNote from "../UpsertForm";

const CreateNote = (props: { params: Promise<{ id: string }> }) => {
  return <ManageNote {...props} />;
};

export default CreateNote;
