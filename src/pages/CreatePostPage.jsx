import PostCreator from "../components/Desmos/PostCreator.jsx";
import PageTitle from "../components/Design/PageTitle.jsx";
import React from "react";

function CreatePostPage() {
    return(
        <div>
            <PageTitle title="CreatePost page" />
            <PostCreator />
        </div>
    )
}

export default CreatePostPage;