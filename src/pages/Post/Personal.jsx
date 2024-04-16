import PageTitle from "@/components/Ui/Title";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Post from "@/components/Main/Post/Index";

const MyPosts = () => {
  const [subspaces, setSubspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { address } = useParams();
  const authorAddress = address;

  // Fetch user personal posts in order to display them on his profile
  useEffect(() => {
    const fetchData = async () => {
      try {
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
        });

        const result = await response.json();

        if (response.ok) {
          setSubspaces(result.data.post);
        } else {
          setError(result.errors);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authorAddress]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <PageTitle title="My posts" />
      <ul className="list-unstyled">
        {subspaces.map((post, index) => (
            <Post post={post} post_page={false} index={index} key={index} />
        ))}
      </ul>
    </div>
  );
};

export default MyPosts;
