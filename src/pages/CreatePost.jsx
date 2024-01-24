import PostCreator from "../components/Desmos/Post.jsx";
import PageTitle from "../components/Design/PageTitle.jsx";
import React from "react";

function CreatePostPage() {
    return(
        <div>
            <PageTitle title="Create Post" />
            <PostCreator />
        </div>
    )
}

export default CreatePostPage;