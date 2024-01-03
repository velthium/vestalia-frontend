import React, { useState } from 'react';
import { DesmosClient, GasPrice, Profiles } from '@desmoslabs/desmjs';

const DesmosProfileSaver = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveResult, setSaveResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setError(null);

    try {
      // Replace with your actual signer
      const signer = ...;

      const client = await DesmosClient.connectWithSigner('https://rpc.mainnet.desmos.network', signer, {
        gasPrice: GasPrice.fromString("0.01udsm"),
      });

      const saveProfile = {
        typeUrl: Profiles.v3.MsgSaveProfileTypeUrl,
        value: {
          creator: "desmos1...", // Replace with your Desmos address
          bio: "The price of all saiyans",
          dtag: "vegeta",
          nickname: "Vegeta",
          coverPicture: "https://ipfs.io/ipfs/<CID>", // Replace <CID> with actual IPFS CID
          profilePicture: "https://ipfs.io/ipfs/<CID>", // Replace <CID> with actual IPFS CID
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
      <h2>Save Desmos Profile</h2>
      <button onClick={handleSaveProfile} disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save Profile'}
      </button>
      {saveResult && <p>Profile Saved! Result: {JSON.stringify(saveResult)}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default DesmosProfileCreator;