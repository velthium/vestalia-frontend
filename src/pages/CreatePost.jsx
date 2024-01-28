import PageTitle from "@/components/Design/PageTitle";
import PostCreator from "@/components/Desmos/Post";
import React from "react";

function CreatePostPage() {
    return(
        <div>
            <PageTitle title="Create Post" />
            <PostCreator status="creation" />
        </div>
    )
}

export default CreatePostPage;