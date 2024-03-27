import { MsgCreateSection } from "@desmoslabs/desmjs-types/desmos/subspaces/v3/msgs";
import SuccessAlert from "@/components/Alert/SuccessAlert";
import ErrorAlert from "@/components/Alert/ErrorAlert";
import { useNavigate } from "react-router-dom";
import { Subspaces } from "@desmoslabs/desmjs";
import Keplr from "@/components/Wallet/Keplr";
import { useParams } from "react-router-dom";
import React, { useState } from "react";
import Long from "long";

const Community = () => {
  const Signer = JSON.parse(sessionStorage.getItem("signerData"));
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { postid } = useParams();

  const handleSaveProfile = async (e) => {
    const formData = new FormData(e.target);
    setIsSaving(true);
    setError(null);

    try {
      e.preventDefault();

      const formData = new FormData(e.target);

      const keplrData = await Keplr();

      const createSection = {
        typeUrl: Subspaces.v3.MsgCreateSectionTypeUrl,
        value: MsgCreateSection.fromPartial({
            subspaceId: Long.fromNumber(21),
            name: formData.get("community-name"),
            description: formData.get("community-description"),
            creator: keplrData.signer.accountData.address
        })
      };

      const result = await keplrData.signAndBroadcast(createSection.value.creator, [createSection], "auto");

      setSuccess(result);
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <form className="align-left" onSubmit={handleSaveProfile}>
        <div className="mb-3">
          <label className="form-label" htmlFor="fname">Community name:</label>
          <textarea className="form-control" type="text" name="community-name" placeholder="Community name" />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="fname">Community description:</label>
          <textarea className="form-control" type="text" name="community-description" placeholder="Community description" />
        </div>
        <button className="btn btn-info text-light" type="submit">Submit</button>
      </form>
      <SuccessAlert success={success} />
      <ErrorAlert error={error} />
    </div>
  );
};

export default Community;
