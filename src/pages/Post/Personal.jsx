import { useQuery } from "@tanstack/react-query";
import Post from "@/components/Main/Post/Index";
import PageTitle from "@/components/Ui/Title";
import { useParams } from "react-router-dom";
import Error from "@/components/Ui/Error";
import React from "react";

const MyPosts = () => {
  const { address } = useParams();
  const authorAddress = address;

  const { data: personalPosts, isLoading, isError } = useQuery({
    queryKey: ["personalPost"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8080/v1/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": "your-admin-secret"
        },
        body: JSON.stringify({
          query: `
            query GetPosts($authorAddress: String!) {
              post(where: { author_address: { _eq: $authorAddress } }) {
                text
                id
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
            authorAddress
          }
        })
      }).then(response => (response.json()));

      return response.data.post;
    }
  });

  if (isLoading) return <div><p>Loading...</p></div>;
  if (isError) return <Error message="Error fetching personnal post data." />;
  if (personalPosts.length === 0) return <Error message="No personal posts found." />;

  return (
    <div>
      <PageTitle title="My posts" />
      <ul className="list-unstyled">
        {personalPosts.map((post, index) => (
            <Post post={post} post_page={false} index={index} key={index} />
        ))}
      </ul>
    </div>
  );
};

export default MyPosts;
