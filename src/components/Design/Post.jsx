import Dislike from "@/components/Desmos/Dislike"
import Like from "@/components/Desmos/Like"
import React from "react";


function Post(props) {

    return(
        <div key={props.index} className="border p-2 m-2 bg-white text-start">
            <a className="text-decoration-none text-success" href={`/community/${props.post.subspace_section.id}/${props.post.subspace_section.name.replace(/\s/g, '')}/${props.post.id}`}>
            <h2 className="h6 text-black">{props.post.text}</h2>
            <p className="h8 my-1">{props.post.subspace_section.name}</p>
            </a>
            <div className="d-flex">
                <Like postId={props.post.id} />
                <Dislike postId={props.post.id} />
                <div className="d-flex p-0 btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="align-self-center bi bi-chat-right-text" viewBox="0 0 16 16">
                    <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"/>
                    <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                </svg>
                <p className="ms-1 mb-0">0 Comments</p>
            </div>
            <div className="me-3 py-0 btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="m-0 align-self-center bi bi-share" viewBox="0 0 16 16">
                    <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"/>
                </svg>
            </div>
            </div>
        </div>
    )
}

export default Post;