import { useQuery } from "@tanstack/react-query";
import Post from "@/components/Main/Post/Index";
import { useParams } from "react-router-dom";
import { AuthContext } from "@/context/Auth";
import React, { useContext } from "react";
import Error from "@/components/Ui/Error";

function ReadPost() {
  const { authData } = useContext(AuthContext);
  const { postid } = useParams();

  // Fetch specific post with its id
  const { data: specificPost, isLoading, isError } = useQuery({
    queryKey: ["specificPost"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8080/v1/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": "your-admin-secret"
        },
        body: JSON.stringify({
          query: `
            query getPost($id: bigint!) {
              post(where: { id: { _eq: $id } }) {
                id
                text
                subspace_section {
                  name
                  id
                }
                post_url {
                  url
                }
              }
            }
          `,
          variables: {
            id: postid
          }
        })
      }).then(res => res.json());

      return response.data.post[0];
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <Error message="Error fetching post." />;

  return (
    <div>
      <Post post={specificPost} index={0} post_page={true} />
      {authData.desmosProfile && (
      <input className="form-control my-3" placeholder="Reply" />
      )}
    </div>
  );
}

export default ReadPost;
