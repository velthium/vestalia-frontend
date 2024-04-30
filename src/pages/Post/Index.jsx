import Reply from "@/components/Main/Post/Reply";
import { useQuery } from "@tanstack/react-query";
import Post from "@/components/Main/Post/Index";
import { request, gql } from "graphql-request";
import { useParams } from "react-router-dom";
import Error from "@/components/Ui/Error";
import React from "react";

function ReadPost() {
  const { postid } = useParams();
  const CONTENT_POST = gql`
  query getPost($id: bigint!) {
    post(where: { id: { _eq: $id }, text: { _is_null: false } }) {
      id
      text
      owner_address
      subspace_section {
        name
        id
      }
      post_url {
        url
      }
      reactions {
        id
        value
        post_row_id
      }
    }
  }
`;

  // Fetch specific post with its id
  const { data: specificPost, isLoading, isError } = useQuery({
    queryKey: ["specificPost"],
    queryFn: async () => request("http://localhost:8080/v1/graphql/", CONTENT_POST, { id: postid }).then(res => (res.post[0]))
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <Error message="Error fetching post." />;

  return (
    <div>
      <Post
        post={specificPost}
        index={0}
        from_page="post_page" />
      <Reply postId={postid} />
    </div>
  );
}

export default ReadPost;
