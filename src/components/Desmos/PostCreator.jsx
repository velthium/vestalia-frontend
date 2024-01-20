import { DesmosClient, GasPrice, Posts } from '@desmoslabs/desmjs';
import { OfflineSignerAdapter, SigningMode } from "@desmoslabs/desmjs";
import { ReplySetting } from "@desmoslabs/desmjs-types/desmos/posts/v3/models";
import { MsgCreatePost } from "@desmoslabs/desmjs-types/desmos/posts/v3/msgs";
import ErrorAlert from "../Alert/ErrorAlert.jsx";
import SuccessAlert from "../Alert/SuccessAlert.jsx";
import React, { useState } from 'react';
import Long from "long";

const DesmosProfileCreator = () => {
  const Signer = JSON.parse(sessionStorage.getItem('signerData'))
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSaveProfile = async (e) => {
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
            text: "testpost #1",
            replySettings: ReplySetting.REPLY_SETTING_EVERYONE
        })
      };

      const result = await keplrData.signAndBroadcast(createPost.value.author, [createPost], "auto");

      setSuccess(result);
    } catch (err) {
      console.log(err)
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <form className='align-left' onSubmit={handleSaveProfile}>
        <div className='mb-3'>
          <label className="form-label" htmlFor="fname">Bio:</label>
          <textarea className="form-control" type="text" name="textpost" placeholder="I'm a superhero!" />
        </div>
        <button className="btn btn-info text-light" type="submit">Submit</button>
      </form>
      <SuccessAlert success={success} />
      <ErrorAlert error={error} />
    </div>
  );
};

export default DesmosProfileCreator;