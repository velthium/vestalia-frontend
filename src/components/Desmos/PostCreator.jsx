import { DesmosClient, GasPrice, Posts } from '@desmoslabs/desmjs';
import { OfflineSignerAdapter, SigningMode } from "@desmoslabs/desmjs";
import { ReplySetting } from "@desmoslabs/desmjs-types/desmos/posts/v3/models";
import ErrorAlert from "../Alert/ErrorAlert.jsx";
import SuccessAlert from "../Alert/SuccessAlert.jsx";
import React, { useState } from 'react';
import Long from "long";

const DesmosProfileCreator = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveResult, setSaveResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSaveProfile = async (e) => {
    setIsSaving(true);
    setError(null);

    try {
      e.preventDefault();

      const formData = new FormData(e.target);

      const mnemonic = "vocal solid animal toast someone invite grape snap praise husband iron lawsuit";

      const signer = await OfflineSignerAdapter.fromMnemonic(SigningMode.DIRECT, mnemonic);

      const client = await DesmosClient.connectWithSigner('https://rpc.mainnet.desmos.network', signer, {
        gasPrice: GasPrice.fromString("0.01udsm"),
      });

      const createPost = {
        typeUrl: Posts.v3.MsgCreatePostTypeUrl,
        value: {
          subspaceId: Long.fromNumber(21),
          author: "desmos1htyqkum6esle9zx7f4e3cfrmzwmyhn4p75pw6c",
          text: formData.get('textpost'),
          replySettings: ReplySetting.REPLY_SETTING_EVERYONE
        }
      };

      const result = await client.signAndBroadcast(createPost.value.author, [createPost], "auto");
      setSaveResult(result);
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
      {saveResult && <SuccessAlert message={`Profile Saved! Result: ${saveResult}`} />}
      <ErrorAlert error={error} />
    </div>
  );
};

export default DesmosProfileCreator;