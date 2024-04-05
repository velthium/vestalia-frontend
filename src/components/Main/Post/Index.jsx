import Dislike from "@/components/Main/Post/Dislike";
import Comment from "@/components/Main/Post/Comment";
import Delete from "@/components/Main/Post/Delete";
import Share from "@/components/Main/Post/Share";
import Like from "@/components/Main/Post/Like";
import { useAuth } from "@/context/Auth";
import PropTypes from "prop-types";
import React from "react";

function Post(props) {
    const { authData } = useAuth();

    return (
        <div key={props.index} className="border p-2 m-2 bg-white text-start">
            {props.clickable ? (
                <a className="text-decoration-none text-success" href={`/community/${props.post.subspace_section.id}/${props.post.subspace_section.name.replace(/\s/g, "")}/${props.post.id}`}>
                    <h2 className="h6 text-black">{props.post.text}</h2>
                    <p className="h8 my-1">{props.post.subspace_section.name}</p>
                </a>
            ) : (
                <React.Fragment>
                    <h2 className="h6 text-black">{props.post.text}</h2>
                    <p className="h8 my-1">{props.post.subspace_section.name}</p>
                </React.Fragment>
            )}
            <div className="d-flex">
                <Like postId={props.post.id} />
                <Dislike postId={props.post.id} />
                <Comment postId={props.post.id} />
                {authData.isConnected && (
                    <Delete postId={props.post.id} />
                )}
                <Share postId={props.post.id} />
            </div>
        </div>
    );
}

Post.propTypes = {
    index: PropTypes.number.isRequired,
    clickable: PropTypes.string.isRequired,
    post: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        subspace_section: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default Post;
