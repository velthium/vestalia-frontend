import { MsgCreatePost, MsgDeletePost } from "@desmoslabs/desmjs-types/desmos/posts/v3/msgs";
import { ReplySetting } from "@desmoslabs/desmjs-types/desmos/posts/v3/models";
import SuccessAlert from "@/components/Alert/SuccessAlert";
import UploadIpfs from "@/components/Desmos/UploadIpfs";
import ErrorAlert from "@/components/Alert/ErrorAlert";
import { useNavigate, useParams } from "react-router-dom";
import Keplr from "@/components/Wallet/Keplr";
import { Posts } from "@desmoslabs/desmjs";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Long from "long";

const Post = ({ status }) => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const { communityid } = useParams();
  const navigate = useNavigate();
  const { postid } = useParams();

  const handleCreatePost = async (e) => {
    setError(null);

    try {
      e.preventDefault();

      const formData = new FormData(e.target);

      const keplrData = await Keplr();

      const uploadResponse = await UploadIpfs(formData.get("post-content"));

      const createPost = {
        typeUrl: Posts.v3.MsgCreatePostTypeUrl,
        value: MsgCreatePost.fromPartial({
            subspaceId: Long.fromNumber(21),
            sectionId: communityid,
            author: keplrData.signer.accountData.address,
            text: formData.get("post-title"),
            replySettings: ReplySetting.REPLY_SETTING_EVERYONE,
            entities: {
              urls: [{
                start: "0",
                end: "1",
                url: "https://ipfs.desmos.network/ipfs/" + uploadResponse.Name,
                display_url: "IPFS"
              }]
            }
        })
      };

      const result = await keplrData.signAndBroadcast(createPost.value.author, [createPost], "auto");

      setSuccess(result);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <div className="p-5 bg-white">
      <form className="align-left" onSubmit={handleCreatePost}>
        <div className="mb-3">
          <label className="form-label" htmlFor="fname">Post title:</label>
          <input className="form-control" type="text" name="post-title" placeholder="Post title" />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="fname">Post content:</label>
          <textarea className="form-control" type="text" name="post-content" placeholder="Post content" />
        </div>
        <button className="btn btn-info text-light" type="submit">Submit</button>
      </form>
      {status === "edit" && (
        <button className="btn btn-info text-light" onClick={handleDeletePost}>Delete post</button>
      )}
      <SuccessAlert success={success} />
      <ErrorAlert error={error} />
    </div>
  );
};

Post.propTypes = {
  status: PropTypes.object.isRequired
};

export default Post;
