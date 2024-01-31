import PageTitle from "@/components/Design/PageTitle";
import React, { useState, useEffect } from "react";

function HomePage() {
  const [data, setData] = useState({ sections: [], posts: [] });

  useEffect(() => {
    fetch('https://api.mainnet.desmos.network/desmos/subspaces/v3/21/sections')
      .then(response => response.json())
      .then(sectionData => {
        fetch('https://api.mainnet.desmos.network/desmos/posts/v3/subspaces/21/posts')
          .then(response => response.json())
          .then(postData => {
            const postsWithAdditionalProperties = postData.posts.map(post => {
              const section = sectionData.sections.find(community => community.id === post.section_id);
              return {
                section_name: section ? section.name : "Unknown Community",
                ...post,
              };
            });

            setData({ sections: sectionData.sections, posts: postsWithAdditionalProperties });

          })
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));

  }, []);


  
  console.log(data)

  return (
    <div className="container">
      <PageTitle title="Vestalia Network" />

      <article className="d-flex overflow-x-scroll">
        {data.sections.map((community, index) => (
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
          {data.posts.map((post, index) => (
            <a className="text-decoration-none text-dark" href={`/community/${post.section_id}/${post.section_name.replace(/\s/g, '')}/${post.id}`}>
                <div key={index} className="my-3 border bg-sand  p-2">
                  <a className="text-decoration-none" href={`/community/${post.section_id}/${post.section_name.replace(/\s/g, '')}`}>
                    <p className="text-start">{post.section_name}</p>
                  </a>
                  <h3 className="text-start">{post.text}</h3>
                </div>
            </a>
          ))}
      </article>
    </div>
  );
}

export default HomePage;
