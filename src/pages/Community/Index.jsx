import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import ErrorAlert from "@/components/Alert/Error";
import Post from "@/components/Main/Post/Index";
import PageTitle from "@/components/Ui/Title";
import { AuthContext } from "@/context/Auth";

function Community() {
  const { authData } = useContext(AuthContext);
  const [error, setError] = useState(null);
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
        });

        const result = await response.json();

        if (response.ok) {
          setPosts(result.data.post);
        } else {
          setError(result);
        }
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  return (
      <div className="container">
          <PageTitle title={communityname} />
          {authData.desmosProfile && (
          <input className="form-control" placeholder="Create post" onClick={handleInputClick}/>
          )}
        <article>
        {posts.map((post, index) => (
            <Post post={post} index={index} key={index} />
        ))}
        </article>
        {error && <ErrorAlert error={error} />}
        </div>
  );
}

export default Community;
