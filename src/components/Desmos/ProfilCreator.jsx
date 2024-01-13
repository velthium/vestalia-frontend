import { DesmosClient, GasPrice, Profiles } from '@desmoslabs/desmjs';
import { OfflineSignerAdapter, SigningMode } from "@desmoslabs/desmjs";
import ErrorAlert from "../Alert/ErrorAlert.jsx";
import SuccessAlert from "../Alert/SuccessAlert.jsx";
import React, { useState } from 'react';

const DesmosProfileCreator = ({ dtag, nickname, bio }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSaveProfile = async (e) => {
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      e.preventDefault();

      const formData = new FormData(e.target);

      const mnemonic = "vocal solid animal toast someone invite grape snap praise husband iron lawsuit";

      const signer = await OfflineSignerAdapter.fromMnemonic(SigningMode.DIRECT, mnemonic);

      const client = await DesmosClient.connectWithSigner('https://rpc.mainnet.desmos.network', signer, {
        gasPrice: GasPrice.fromString("0.01udsm"),
      });

      const saveProfile = {
        typeUrl: Profiles.v3.MsgSaveProfileTypeUrl,
        value: {
          creator: "desmos1htyqkum6esle9zx7f4e3cfrmzwmyhn4p75pw6c",
          bio: formData.get('bio'),
          dtag: formData.get('dtag'),
          nickname: formData.get('username'),
          coverPicture: "https://ipfs.io/ipfs/<CID>",
          profilePicture: "https://ipfs.io/ipfs/<CID>",
        }
      };

      const result = await client.signAndBroadcast(saveProfile.value.creator, [saveProfile], "auto");
      setSuccess(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <form className='align-left' onSubmit={handleSaveProfile}>
        <div className='mb-3'>
          <label className="form-label" htmlFor="fname">Username:</label>
          <input className="form-control" type="text" name="username" value={nickname} placeholder='velthium' />
        </div>
        <div className='mb-3'>
          <label className="form-label" htmlFor="fname">Dtag:</label>
          <input className="form-control" type="text" name="dtag" value={dtag} placeholder='velthium' />
        </div>
        <div className='mb-3'>
          <label className="form-label" htmlFor="fname">Bio:</label>
          <textarea className="form-control" type="text" name="bio" value={bio} placeholder="I'm a superhero!" />
        </div>
        <button className="btn btn-info text-light" type="submit">Submit</button>
      </form>
      <SuccessAlert success={success} />
      <ErrorAlert error={error} />
    </div>
  );
};

export default DesmosProfileCreator;