import PageTitle from "@/components/Design/PageTitle";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useAuth } from '@/context/Auth';

function Community() {
    const { authData, setAuthData } = useAuth();
    const [posts, setPosts] = useState([]);
    const { communityname } = useParams();
    const { communityid } = useParams();
    const navigate = useNavigate();

    const handleInputClick = () => {
        navigate(`/community/${communityid}/${communityname}/create-post`);
    };

    console.log(`https://api.mainnet.desmos.network/desmos/posts/v3/subspaces/21/sections/${communityid}/posts`)

    useEffect(() => {
        fetch(`https://api.mainnet.desmos.network/desmos/posts/v3/subspaces/21/sections/${communityid}/posts`)
          .then(response => response.json())
          .then(data => {
            setPosts(data.posts);
          })
          .catch(error => console.error(error));
      }, []);

    return(
        <div className="container">
            <PageTitle title={communityname} />
            {authData.isConnected && (
            <input className="form-control" placeholder="Create post" onClick={handleInputClick}/>
            )}
        <article>
        {posts.map((post, index) => (
            <div key={index} className="my-3 py-3 border bg-sand">

            <h3 className="text-start p-2">{ post.text }</h3>
            </div>
        ))}
        </article>
         </div>
    )
}

export default Community