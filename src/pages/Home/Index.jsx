import ErrorAlert from "@/components/Alert/ErrorAlert";
import React, { useState, useEffect } from "react";
import Post from "@/components/Main/Post/Index";

function HomePage() {
  const [communities, setCommunities] = useState([]);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

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
              query getPostsAndSections {
                post {
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
            `
          })
        });

        const result = await response.json();

        if (response.ok) {
          setPosts(result.data.post);
          setCommunities(result.data.subspace_section);
        } else {
          setError(result.errors);
        }
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        console.log("finally");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container p-0 p-lg-1">
      <article className="d-flex overflow-x-scroll mb-4">
        {communities.map((community, index) => (
          <div key={index} className="card m-2 flex-shrink-0">
            <a className="text-decoration-none" href={`/community/${community.id}/${community.name.replace(/\s/g, "")}`}>
              <div className="card-body py-1">
                <h1 className="h7 card-title text-success">{community.name}</h1>
              </div>
            </a>
          </div>
        ))}
      </article>
      <article>
          {posts.map((post, index) => (
            <Post key={post.id} post={post} index={index} />
          ))}
      </article>
      <ErrorAlert error={error} />
    </div>
  );
}

export default HomePage;
