import Dislike from "@/components/Main/Post/Dislike";
import Comment from "@/components/Main/Post/Comment";
import React, { useEffect, useState } from "react";
import Delete from "@/components/Main/Post/Delete";
import Share from "@/components/Main/Post/Share";
import Like from "@/components/Main/Post/Like";
import { useAuth } from "@/context/Auth";
import GetIpfs from "@/utils/Ipfs/Get";
import PropTypes from "prop-types";

 function Post(props) {
    const { authData } = useAuth();
    const [textpost, setTextpost] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ipfsContent = await GetIpfs(props.post.post_url.url);
                setTextpost(ipfsContent);
            } catch (error) {
                console.error("Erreur lors de la récupération des données depuis IPFS :", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div key={props.index} className="border p-2 m-2 bg-white text-start">
            {props.post_page ? (
                <React.Fragment>
                    <h2 className="h6 fw-bold">{props.post.text}</h2>
                    <p className="h8 my-1">{props.post.subspace_section.name}</p>
                    {textpost}
                </React.Fragment>
            ) : (
                <a className="text-decoration-none" href={`/community/${props.post.subspace_section.id}/${props.post.subspace_section.name.replace(/\s/g, "")}/${props.post.id}`}>
                    <h2 className="h6 fw-bold">{props.post.text}</h2>
                    <p className="h8 my-1">{props.post.subspace_section.name}</p>
                    {textpost}
                </a>
            )}
            <div className="d-flex flex-wrap">
                <div className="d-flex post-buttons my-1">
                    <Like postId={props.post.id} />
                    <Dislike postId={props.post.id} />
                </div>
                <Comment postId={props.post.id} />
                <Share postId={props.post.id} />
                {authData.isConnected && (
                    <Delete postId={props.post.id} />
                )}
            </div>
        </div>
    );
}

Post.propTypes = {
    index: PropTypes.number.isRequired,
    post_page: PropTypes.bool.isRequired,
    post: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        subspace_section: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
        }).isRequired,
        post_url: PropTypes.shape({
            url: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default Post;
