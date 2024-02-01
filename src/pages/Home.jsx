import PageTitle from "@/components/Design/PageTitle";
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
                  section_row_id
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
          console.log(result.data.post[2])
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
      <PageTitle title="Vestalia Network" />

      <article className="d-flex overflow-x-scroll">
        {communities.map((community, index) => (
          <div key={index} className="card w-25 m-2 flex-shrink-0">
            <a className="text-decoration-none" href={`/community/${community.id}/${community.name.replace(/\s/g, '')}`}>
              <div className="card-body">
                <h5 className="card-title">{community.name}</h5>
              </div>
            </a>
          </div>
        ))}
      </article>
      <article>
          {posts.map((post, index) => (
              <div key={index} className="my-3 border bg-sand text-start p-2">
                  <a className="text-decoration-none text-dark" href={`/community/${post.subspace_section.id}/${post.subspace_section.name.replace(/\s/g, '')}/${post.id}`}>
                  <p>{post.subspace_section.name}</p>
                  <h5>{post.text}</h5>
                </a>
              </div>
          ))}
      </article>
    </div>
  );
}

export default HomePage;
