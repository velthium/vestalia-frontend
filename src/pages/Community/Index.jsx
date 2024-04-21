import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Post from "@/components/Main/Post/Index";
import { request, gql } from "graphql-request";
import PageTitle from "@/components/Ui/Title";
import { AuthContext } from "@/context/Auth";
import Error from "@/components/Ui/Error";
import React, { useContext } from "react";

function Community() {
  const { authData } = useContext(AuthContext);
  const { communityname } = useParams();
  const { communityid } = useParams();
  const navigate = useNavigate();

  const COMMUNITY_POSTS = gql`
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
  `;

  const handleInputClick = () => {
    navigate(`/community/${communityid}/${communityname}/create-post`);
  };

  const { data: communityPosts, isLoading, isError } = useQuery({
    queryKey: ["communityPost"],
    queryFn: async () => request("http://localhost:8080/v1/graphql/", COMMUNITY_POSTS, { id: communityid }).then(res => (res.post))
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching community post</div>;

  return (
      <div className="container">
          <PageTitle title={communityname} />
          {authData.desmosProfile && (
          <input className="form-control w-50 mb-5 m-auto" placeholder="Create post" onClick={handleInputClick}/>
          )}
        <article>
        {communityPosts.length > 0 ? (
          communityPosts.map((post, index) => (
                <Post post={post} index={index} key={index} post_page={false}/>
          ))
        ) : (
        <Error message="No posts found on this community." />
        )}
        </article>
        </div>
  );
}

export default Community;
