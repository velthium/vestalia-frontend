import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Post from "@/components/Design/Post"

const MyPosts = () => {
  const [subspaces, setSubspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { address } = useParams();
  const authorAddress = "desmos1px9u048n0xz4k7qchkha4wyku2wy2dkhj4thg6";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/v1/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': 'your-admin-secret',
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
                }
              }
            `,
            variables: {
              authorAddress: authorAddress,
            },
          }),
        });

        const result = await response.json();

        if (response.ok) {
          setSubspaces(result.data.post);
        } else {
          setError(result.errors);
        }
      } catch (err) {
        setError(err.message);
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
      <h1>My posts</h1>
      <ul className="list-unstyled">
        {subspaces.map((post, index) => (
            <Post post={post} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default MyPosts;
