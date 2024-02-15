import React, { useState, useEffect } from "react";

function HomePage() {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

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
            `,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          setPosts(result.data.post)
          setCommunities(result.data.subspace_section);
        } else {
          setError(result.errors);
        }
      } catch (err) {
        console.log(err)
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="container">
      <article className="d-flex overflow-x-scroll">
        {communities.map((community, index) => (
          <div key={index} className="card m-2 flex-shrink-0">
            <a className="text-decoration-none" href={`/community/${community.id}/${community.name.replace(/\s/g, '')}`}>
              <div className="card-body py-1">
                <h1 className="h7 card-title text-success">{community.name}</h1>
              </div>
            </a>
          </div>
        ))}
      </article>
      <article>
          {posts.map((post, index) => (
              <div key={index} className="my-2 border bg-white text-start px-2">
                  <a className="text-decoration-none text-success" href={`/community/${post.subspace_section.id}/${post.subspace_section.name.replace(/\s/g, '')}/${post.id}`}>
                    <p className="h8 my-1">{post.subspace_section.name}</p>
                    <h2 className="h7 text-black">{post.text}</h2>
                  </a>
              </div>
          ))}
      </article>
    </div>
  );
}

export default HomePage;
