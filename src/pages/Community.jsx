import PageTitle from "@/components/Design/PageTitle";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Post from "@/components/Design/Post";
import { useAuth } from "@/context/Auth";

function Community() {
    const [loading, setLoading] = useState(true);
    const { authData, setAuthData } = useAuth();
    const [posts, setPosts] = useState([]);
    const { communityname } = useParams();
    const { communityid } = useParams();
    const navigate = useNavigate();

    const handleInputClick = () => {
        navigate(`/community/${communityid}/${communityname}/create-post`);
    };

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
                  query getPostsFromSection($id: bigint!) {
                    post(where: {subspace_section: {id: {_eq: $id}}}) {
                      id
                      text
                      subspace_section {
                        name
                        id
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
            });

            const result = await response.json();

            if (response.ok) {
              setPosts(result.data.post);
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
        <div className="container">
            <PageTitle title={communityname} />
            {authData.isConnected && (
            <input className="form-control" placeholder="Create post" onClick={handleInputClick}/>
            )}
        <article>
        {posts.map((post, index) => (
            <Post post={post} index={index} />
        ))}
        </article>
         </div>
    );
}

export default Community;
