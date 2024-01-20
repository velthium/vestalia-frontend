import PageTitle from "../components/Design/PageTitle.jsx";
import React, { useState, useEffect } from "react";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({});
  
  useEffect(() => {
    fetch('https://api.mainnet.desmos.network/desmos/posts/v3/subspaces/21/posts')
      .then(response => response.json())
      .then(data => {
        setPosts(data.posts);
        setPagination(data.pagination);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container">
    <PageTitle title="Vestalia Network" />
    <article>
      {posts.map((post, index) => (
        <div key={index} className="my-3 py-3 border bg-sand">
          <h3 className="text-start p-2">{ post.text }</h3>
        </div>
      ))}
    </article>
  </div>
);
}

export default HomePage;