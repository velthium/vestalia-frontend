import React, { useContext, useEffect, useState } from "react";
import Downvote from "@/components/Main/Post/Downvote";
import Comment from "@/components/Main/Post/Comment";
import Upvote from "@/components/Main/Post/Upvote";
import Delete from "@/components/Main/Post/Delete";
import GetProfile from "@/utils/Desmos/GetProfile";
import Share from "@/components/Main/Post/Share";
import { AuthContext } from "@/context/Auth";
import GetIpfs from "@/utils/Ipfs/Get";
import PropTypes from "prop-types";

function Post(props) {
  const [userNickname, setUserNickname] = useState(null);
  const { authData } = useContext(AuthContext);
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

    const fetchProfile = async () => {
      try {
        const profile = await GetProfile(props.post.owner_address);
        setUserNickname(profile.nickname);
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
      }
    };

    fetchProfile();
  }, [props.post.owner_address]);

  return (
    <div
      key={props.index}
      className="border p-2 m-2 bg-white text-start">
      {props.from_page === "post_page" ? (
        <React.Fragment>
          <p className="h8 my-1">s/{props.post.subspace_section.name}</p>
          <p className="h8 my-1">u/{userNickname}</p>
          <h2 className="h5 fw-bold">{props.post.text}</h2>
          {textpost}
        </React.Fragment>
      ) : (
        <a
          className="text-decoration-none"
          href={`/community/${props.post.subspace_section.id}/${props.post.subspace_section.name.replace(/\s/g, "")}/${props.post.id}`}>
          {props.from_page !== "community_page" && (
          <p className="h8 my-1">s/{props.post.subspace_section.name}</p>
          )}
          <p>u/{userNickname}</p>
          <h2 className="h5 fw-bold">{props.post.text}</h2>
          {textpost}
        </a>
      )}
      <div className="d-flex flex-wrap">
        <div className="d-flex post-buttons my-1">
          <Upvote
            postId={props.post.id}
            postReactions={props.post.reactions} />
          <Downvote
            postId={props.post.id}
            postReactions={props.post.reactions} />
        </div>
        <Comment postId={props.post.id} />
        <Share postId={props.post.id} />
        {authData.walletSigner && (
          <Delete postId={props.post.id} />
        )}
      </div>
    </div>
  );
}

Post.propTypes = {
  index: PropTypes.number.isRequired,
  from_page: PropTypes.string.isRequired,
  post: PropTypes.shape({
    owner_address: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    subspace_section: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    post_url: PropTypes.shape({
      url: PropTypes.string.isRequired
    }).isRequired,
    reactions: PropTypes.shape({
      url: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default Post;
