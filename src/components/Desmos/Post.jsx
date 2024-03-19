import { MsgCreatePost, MsgDeletePost } from "@desmoslabs/desmjs-types/desmos/posts/v3/msgs";
import { ReplySetting } from "@desmoslabs/desmjs-types/desmos/posts/v3/models";
import SuccessAlert from "@/components/Alert/SuccessAlert";
import UploadIpfs from "@/components/Desmos/UploadIpfs";
import ErrorAlert from "@/components/Alert/ErrorAlert";
import { useNavigate } from "react-router-dom";
import Keplr from "@/components/Wallet/Keplr";
import { useParams } from "react-router-dom";
import { Posts } from '@desmoslabs/desmjs';
import React, { useState } from 'react';
import Long from "long";

const Post = ({ status }) => {

  const Signer = JSON.parse(sessionStorage.getItem('signerData'))
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const { communityid } = useParams();
  const navigate = useNavigate();
  const { postid } = useParams();

  const handleCreatePost = async (e) => {
    setIsSaving(true);
    setError(null);

    try {
      e.preventDefault();

      const formData = new FormData(e.target);

      const keplrData = await Keplr();

      const uploadResponse = await UploadIpfs(formData.get('post-content'));

      const createPost = {
        typeUrl: Posts.v3.MsgCreatePostTypeUrl,
        value: MsgCreatePost.fromPartial({
            subspaceId: Long.fromNumber(21),
            sectionId: communityid,
            author: keplrData.signer.accountData.address,
            text: formData.get('post-title'),
            replySettings: ReplySetting.REPLY_SETTING_EVERYONE,
            entities: {
              urls: {
                "start": "0",
                "end": "1",
                "url": "https://scripta.infura-ipfs.io/ipfs/" + uploadResponse.Name,
                "display_url": "IPFS"
              }
            }
        })
      };

      const result = await keplrData.signAndBroadcast(createPost.value.author, [createPost], "auto");

      setSuccess(result);
      navigate(`/`);
    } catch (err) {
      console.log(err)
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePost = async () => {
    setIsSaving(true);
    setError(null);

    try {
      const keplrData = await Keplr();

      const deletePost = {
        typeUrl: Posts.v3.MsgDeletePostTypeUrl,
        value: MsgDeletePost.fromPartial({
          subspaceId: Long.fromNumber(21),
          postId: Long.fromNumber(postid),
          signer: keplrData.signer.accountData.address,
        })
      };

      console.log(deletePost.value)

      const result = await keplrData.signAndBroadcast(deletePost.value.signer, [deletePost], "auto");

      setSuccess(result);

      navigate(`/user/${keplrData.signer.accountData.address}/posts`);

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-5 bg-white">
      <form className='align-left' onSubmit={handleCreatePost}>
        <div className='mb-3'>
          <label className="form-label" htmlFor="fname">Post title:</label>
          <input className="form-control" type="text" name="post-title" placeholder="Post title" />
        </div>
        <div className='mb-3'>
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

export default Post;