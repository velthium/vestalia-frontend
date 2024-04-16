import React, { useEffect, useState, useContext } from "react";
import ErrorAlert from "@/components/Alert/Error";
import Post from "@/components/Main/Post/Index";
import { useParams } from "react-router-dom";
import { AuthContext } from "@/context/Auth";

function ReadPost() {
  const { authData } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState({});
  const { postid } = useParams();

  // Fetch specific post with its id
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
        });

        const result = await response.json();

        if (response.ok) {
          setPost(result.data.post[0]);
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
  }, []);

  return (
    <div>
      {loading ? (<p>Loading...</p>) : post.id ? (<Post post={post} index={0} post_page={true} />) : (<p>No post found</p>)}
      {authData.desmosProfile && (
      <input className="form-control my-3" placeholder="Reply" />
      )}
      {error && <ErrorAlert error={error} />}
    </div>
  );
}

export default ReadPost;
