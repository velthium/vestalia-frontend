import PostCreator from "../components/Desmos/Post.jsx";
import PageTitle from "../components/Design/PageTitle.jsx";
import React from "react";

function EditPost() {
    return(
        <div>
            <PageTitle title="Edit post" />
            <PostCreator />
        </div>
    )
}

export default EditPost;