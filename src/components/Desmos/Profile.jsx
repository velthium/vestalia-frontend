import SuccessAlert from "@/components/Alert/SuccessAlert";
import ErrorAlert from "@/components/Alert/ErrorAlert";
import React, { useState, useEffect } from 'react';
import Keplr from "@/components/Wallet/Keplr";
import { useNavigate } from "react-router-dom";
import { Profiles } from '@desmoslabs/desmjs';

const Profile = ({ dtag: initialDtag, nickname: initialNickname, bio: initialBio, wallet: initialWallet }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    username: initialNickname || '',
    dtag: initialDtag || '',
    bio: initialBio || '',
  });

  useEffect(() => {
    setFormValues({
      username: initialNickname || '',
      dtag: initialDtag || '',
      bio: initialBio || '',
    });
  }, [initialNickname, initialDtag, initialBio]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData(e.target);
      const keplrData = await Keplr();

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
    window.dispatchEvent(new Event('storage'));
    navigate("/");
  };

  const MyPostsPage = () => {
    navigate(`/user/${initialWallet}/posts`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
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
            value={formValues.username}
            onChange={handleInputChange}
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
            value={formValues.dtag}
            onChange={handleInputChange}
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
            value={formValues.bio}
            onChange={handleInputChange}
            placeholder="Enter a bio"
          />
        </div>
        <button className="btn btn-info text-light" type="submit">Submit</button>
      </form>
      <SuccessAlert success={success} />
      <ErrorAlert error={error} />
      <button className="btn btn-secondary text-light m-2" onClick={MyPostsPage}>Your posts</button>
      <button className="btn btn-danger text-light m-2" onClick={handleClearSessionStorage}>Logout</button>
    </div>
  );
};

export default Profile;
