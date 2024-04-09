import PageTitle from "@/components/Ui/Title";
import PostCreator from "@/components/Main/Post/Create";
import React from "react";

function CreatePostPage() {
    return (
        <div>
            <PageTitle title="Create Post" />
            <PostCreator />
        </div>
    );
}

export default CreatePostPage;
