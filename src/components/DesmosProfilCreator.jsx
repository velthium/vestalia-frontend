import { DesmosClient, GasPrice, Profiles } from '@desmoslabs/desmjs';
import { OfflineSignerAdapter, SigningMode } from "@desmoslabs/desmjs";
import React, { useState } from 'react';

const DesmosProfileCreator = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveResult, setSaveResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setError(null);

    try {
      const mnemonic = "vocal solid animal toast someone invite grape snap praise husband iron lawsuit";

      // Remplacez ceci par votre propre signer
      const signer = await OfflineSignerAdapter.fromMnemonic(SigningMode.DIRECT, mnemonic);

      const client = await DesmosClient.connectWithSigner('https://rpc.mainnet.desmos.network', signer, {
        gasPrice: GasPrice.fromString("0.01udsm"),
      });

      const saveProfile = {
        typeUrl: Profiles.v3.MsgSaveProfileTypeUrl,
        value: {
          creator: "desmos1htyqkum6esle9zx7f4e3cfrmzwmyhn4p75pw6c", // Replace with your Desmos address
          bio: "The price of all saiyans",
          dtag: "vegeta",
          nickname: "Vegeta",
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
      <form className='align-left'>
        <div className='mb-3'>
          <label className="form-label" for="fname">Username:</label>
          <input className="form-control" type="text" placeholder='velthium' />
        </div>
        <div className='mb-3'>
          <label className="form-label" for="fname">Dtag:</label>
          <input className="form-control" type="text" placeholder='velthium' />
        </div>
        <div className='mb-3'>
          <label className="form-label" for="fname">Bio:</label>
          <textarea className="form-control" type="text" placeholder="I'm a superhero!" />
        </div>
      </form>
      <button type="button" className="btn btn-info text-light" onClick={handleSaveProfile} disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save Profile'}
      </button>
      {saveResult && <p>Profile Saved! Result: {JSON.stringify(saveResult)}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default DesmosProfileCreator;