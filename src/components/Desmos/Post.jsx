import { MsgCreatePost, MsgDeletePost } from "@desmoslabs/desmjs-types/desmos/posts/v3/msgs";
import { ReplySetting } from "@desmoslabs/desmjs-types/desmos/posts/v3/models";
import SuccessAlert from "@/components/Alert/SuccessAlert";
import ErrorAlert from "@/components/Alert/ErrorAlert";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Posts } from '@desmoslabs/desmjs';
import Keplr from "@/components/Wallet/Keplr";
import React, { useState } from 'react';
import Long from "long";

const Post = ({ status }) => {

  const Signer = JSON.parse(sessionStorage.getItem('signerData'))
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { postid } = useParams();

  const handleCreatePost = async (e) => {
    const formData = new FormData(e.target);
    setIsSaving(true);
    setError(null);

    try {
      e.preventDefault();

      const formData = new FormData(e.target);

      const keplrData = await Keplr();

      const createPost = {
        typeUrl: Posts.v3.MsgCreatePostTypeUrl,
        value: MsgCreatePost.fromPartial({
            subspaceId: Long.fromNumber(21),
            author: keplrData.signer.accountData.address,
            text: formData.get('textpost'),
            replySettings: ReplySetting.REPLY_SETTING_EVERYONE
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
    <div>
      <form className='align-left' onSubmit={handleCreatePost}>
        <div className='mb-3'>
          <label className="form-label" htmlFor="fname">Bio:</label>
          <textarea className="form-control" type="text" name="textpost" placeholder="I'm a superhero!" />
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