import SuccessAlert from "@/components/Alert/Success";
import Keplr from "@/components/Main/Wallet/Keplr";
import ErrorAlert from "@/components/Alert/Error";
import PageTitle from "@/components/Ui/Title";
import React, { useState } from "react";
import Long from "long";

function CreateCommunity() {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Save the profile data in the blockchain
  const handleSaveProfile = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const keplrData = await Keplr();

      const createSection = {
        typeUrl: "/desmos.subspaces.v3.MsgCreateSection",
        value: {
          subspaceId: Long.fromNumber(21),
          name: formData.get("community-name"),
          description: formData.get("community-description"),
          creator: keplrData.signer.accountData.address
        }
      };

      const result = await keplrData.signAndBroadcast(createSection.value.creator, [createSection], "auto");
      setSuccess(result);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div>
      <PageTitle title="Create community" />
      <div>
        <form
          className="align-left"
          onSubmit={handleSaveProfile}>
          <div className="mb-3">
            <label
              className="form-label"
              htmlFor="fname">Community name:
            </label>
            <textarea
              className="form-control"
              type="text"
              name="community-name"
              placeholder="Community name" />
          </div>
          <div className="mb-3">
            <label
              className="form-label"
              htmlFor="fname">
              Community description:
            </label>
            <textarea
              className="form-control"
              type="text"
              name="community-description"
              placeholder="Community description" />
          </div>
          <button
            className="btn btn-info text-light"
            type="submit">Submit
          </button>
        </form>
        {success && <SuccessAlert success={success} />}
        {error && <ErrorAlert error={error} />}
      </div>
    </div>
  );
}

export default CreateCommunity;
