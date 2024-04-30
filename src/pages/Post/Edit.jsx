import PageTitle from "@/components/Ui/Title";
import PostCreator from "@/components/Main/Post/Index";
import React from "react";

function EditPost() {
  return (
    <div>
      <PageTitle title="Edit post" />
      <PostCreator status="edit"/>
    </div>
  );
}

export default EditPost;
