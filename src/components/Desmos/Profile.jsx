import { DesmosClient, GasPrice, Profiles } from '@desmoslabs/desmjs';
import { DesmosChains, SigningMode } from "@desmoslabs/desmjs";
import { KeplrSigner } from "@desmoslabs/desmjs-keplr";
import SuccessAlert from "../Alert/SuccessAlert.jsx";
import { useAuth } from '../../context/AuthContext';
import ErrorAlert from "../Alert/ErrorAlert.jsx";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import Keplr from "../Wallet/Keplr.jsx";

const DesmosProfile = ({ dtag, nickname, bio }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(null);
  const { authData, setAuthData } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {

      const formData = new FormData(e.target);

      const keplrData = await Keplr();

      console.log(keplrData.signer.accountData.address)
      
      const saveProfile = {
        typeUrl: Profiles.v3.MsgSaveProfileTypeUrl,
        value: {
          creator: keplrData.signer.accountData.address,
          bio: formData.get('bio'),
          dtag: formData.get('dtag'),
          nickname: formData.get('username'),
          coverPicture: "https://ipfs.io/ipfs/<CID>",
          profilePicture: "https://ipfs.io/ipfs/<CID>",
        }
      };

      console.log(saveProfile.value.creator)

      const result = await keplrData.signAndBroadcast(saveProfile.value.creator, [saveProfile], "auto");

      setSuccess(result);
    } catch (err) {
      setError(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearSessionStorage = () => {
    sessionStorage.clear();
    window.dispatchEvent( new Event('storage') )
    navigate("/");
  };

  return (
    <div>
      <form className='align-left' onSubmit={handleSaveProfile}>
      <div className='mb-3'>
        <label className="form-label" htmlFor="username">Username:</label>
        <input
          className="form-control"
          type="text"
          name="username"
          id="username"

          placeholder='Enter a username'
        />
      </div>
      <div className='mb-3'>
        <label className="form-label" htmlFor="dtag">Dtag:</label>
        <input
          className="form-control"
          type="text"
          name="dtag"
          id="dtag"

          placeholder='Enter a dtag'
        />
      </div>
      <div className='mb-3'>
        <label className="form-label" htmlFor="bio">Bio:</label>
        <textarea
          className="form-control"
          type="text"
          name="bio"
          id="bio"

          placeholder="Enter a bio"
        />
      </div>
        <button className="btn btn-info text-light" type="submit">Submit</button>
      </form>
      <SuccessAlert success={success} />
      <ErrorAlert error={error} />
      <button className="btn btn-danger text-light" onClick={handleClearSessionStorage}>Logout</button>
    </div>
  );
};

export default DesmosProfile;