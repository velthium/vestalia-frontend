import React, { useState } from 'react';
import { DesmosClient, GasPrice, Profiles } from '@desmoslabs/desmjs';
import { OfflineSignerAdapter, SigningMode } from "@desmoslabs/desmjs";

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