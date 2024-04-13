import { MsgCreateSection } from "@desmoslabs/desmjs-types/desmos/subspaces/v3/msgs";
import SuccessAlert from "@/components/Alert/Success";
import Keplr from "@/components/Main/Wallet/Keplr";
import ErrorAlert from "@/components/Alert/Error";
import { Subspaces } from "@desmoslabs/desmjs";
import React, { useState } from "react";
import Long from "long";

const Community = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSaveProfile = async (e) => {
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
      setError(err);
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
      {success && <SuccessAlert success={success} />}
      {error && <ErrorAlert error={error} />}
    </div>
  );
};

export default Community;
