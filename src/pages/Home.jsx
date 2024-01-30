import PageTitle from "@/components/Design/PageTitle";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [communities, setCommunities] = useState([]);
  
  useEffect(() => {
    fetch('https://api.mainnet.desmos.network/desmos/subspaces/v3/21/sections')
      .then(response => response.json())
      .then(data => {
        setCommunities(data.sections);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch('https://api.mainnet.desmos.network/desmos/posts/v3/subspaces/21/posts')
      .then(response => response.json())
      .then(data => {
        const postsWithAdditionalProperties = data.posts.map(post => {

          return {
            ...post,
            section_name: "Unknown Community",
          };
        });
  
        // Concatenate the new posts with the existing posts
        setPosts(prevPosts => [...prevPosts, ...postsWithAdditionalProperties]);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container">
    <PageTitle title="Vestalia Network" />

    <article className="d-flex overflow-x-scroll">
      {communities.map((community, index) => (
        <div key={index} className="card w-25 m-2 flex-shrink-0">
          <a href={`/community/${community.id}/${community.name.replace(/\s/g, '')}`}>
            <div className="card-body">
              <h5 className="card-title">{ community.name }</h5>
            </div>
          </a>
        </div>
      ))}
    </article>
    <article>
      <a href="">
      {posts.map((post, index) => (
        <div key={index} className="my-3 py-3 border bg-sand">
          <h3 className="text-start p-2">{ post.text }</h3>
        </div>
      ))}
      </a>
    </article>
  </div>
);
}

export default HomePage;