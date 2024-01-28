import PageTitle from "@/components/Design/PageTitle";
import PostCreator from "@/components/Desmos/Post";
import React from "react";

function EditPost() {
    return(
        <div>
            <PageTitle title="Edit post" />
            <PostCreator status="edit"/>
        </div>
    )
}

export default EditPost;