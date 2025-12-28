import React from "react";
import ManageNote from "../../UpsertForm";

const EditNote = (props: { params: Promise<{ id: string }> }) => {
  return <ManageNote {...props} />;
};

export default EditNote;
