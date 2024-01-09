import { DesmosClient, GasPrice, Profiles } from '@desmoslabs/desmjs';
import { OfflineSignerAdapter, SigningMode } from "@desmoslabs/desmjs";
import React, { useState } from 'react';

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

      // Remplacez ceci par votre propre signer
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
      setSaveResult(result);
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
          <input className="form-control" type="text" name="username" placeholder='velthium' />
        </div>
        <div className='mb-3'>
          <label className="form-label" htmlFor="fname">Dtag:</label>
          <input className="form-control" type="text" name="dtag" placeholder='velthium' />
        </div>
        <div className='mb-3'>
          <label className="form-label" htmlFor="fname">Bio:</label>
          <textarea className="form-control" type="text" name="bio" placeholder="I'm a superhero!" />
        </div>
        <button className="btn btn-info text-light" type="submit">Submit</button>
      </form>
      {saveResult && <p>Profile Saved! Result: {JSON.stringify(saveResult)}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default DesmosProfileCreator;