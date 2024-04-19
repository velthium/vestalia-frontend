import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Post from "@/components/Main/Post/Index";
import PageTitle from "@/components/Ui/Title";
import { AuthContext } from "@/context/Auth";
import Error from "@/components/Ui/Error";
import React, { useContext } from "react";

function Community() {
  const { authData } = useContext(AuthContext);
  const { communityname } = useParams();
  const { communityid } = useParams();
  const navigate = useNavigate();

  const handleInputClick = () => {
    navigate(`/community/${communityid}/${communityname}/create-post`);
  };

  const { data: communityPosts, isLoading, isError } = useQuery({
    queryKey: ["communityPost"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8080/v1/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": "your-admin-secret"
        },
        body: JSON.stringify({
          query: `
            query getPostsFromSection($id: bigint!) {
              post(where: {subspace_section: {id: {_eq: $id}}}) {
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
              subspace_section {
                name
                id
              }
            }
          `,
          variables: {
            id: communityid
          }
        })
      })
        .then(response => (response.json()));

      return response.data.post;
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching community post</div>;
  if (communityPosts.length === 0) return <Error message="No posts found on this community." />;

  return (
      <div className="container">
          <PageTitle title={communityname} />
          {authData.desmosProfile && (
          <input className="form-control w-50 m-auto" placeholder="Create post" onClick={handleInputClick}/>
          )}
        <article>
        {communityPosts.map((post, index) => (
              <Post post={post} index={index} key={index} post_page={false}/>
        ))}
        </article>
        </div>
  );
}

export default Community;
