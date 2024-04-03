import ErrorAlert from "@/components/Alert/ErrorAlert";
import React, { useEffect, useState } from "react";
import Post from "@/components/Main/Post/Index";
import { useParams } from "react-router-dom";
import { useAuth } from "@/context/Auth";

function ReadPost() {
    const [loading, setLoading] = useState(true);
    const { authData } = useAuth();
    const [error, setError] = useState(null);
    const [post, setPost] = useState({});
    const { postid } = useParams();

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
            console.log(err);
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };

        fetchData();
      }, []);

    return (
      <div>
        {loading ? (<p>Loading...</p>) : post.id ? (<Post post={post} index="0" />) : (<p>No post found</p>)}
        {authData.isConnected && (
        <input className="form-control my-3" placeholder="Reply" onClick=""/>
        )}
        <ErrorAlert error={error} />
      </div>
    );
}

export default ReadPost;