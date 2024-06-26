import { ReplySetting } from "@desmoslabs/desmjs-types/desmos/posts/v3/models";
import { useNavigate, useParams } from "react-router-dom";
import SuccessAlert from "@/components/Alert/Success";
import Keplr from "@/components/Main/Wallet/Keplr";
import ErrorAlert from "@/components/Alert/Error";
import PageTitle from "@/components/Ui/Title";
import React, { useState } from "react";
import IpfsAdd from "@/utils/Ipfs/Add";

function CreatePostPage() {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const { communityid } = useParams();
  const navigate = useNavigate();

  // Create a new post on the blockchain
  const handleCreatePost = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData(e.target);
      const keplrData = await Keplr();

      const uploadResponse = await IpfsAdd(formData.get("post-content"));

      // The definition of the message MsgCreatePost
      const MsgCreatePost = {
        typeUrl: "/desmos.posts.v3.MsgCreatePost",
        value: {
          subspaceId: 21,
          section_id: communityid,
          text: formData.get("post-title"),
          author: keplrData.signer.accountData.address,
          replySettings: ReplySetting.REPLY_SETTING_EVERYONE,
          entities: {
            urls: [{
              start: "0",
              end: "1",
              url: "https://ipfs.desmos.network/ipfs/" + uploadResponse.Name,
              display_url: "IPFS"
            }]
          }
        }
      };

      const result = await keplrData.signAndBroadcast(MsgCreatePost.value.author, [MsgCreatePost], "auto");

      setSuccess(result);
      navigate("/");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div>
      <PageTitle title="Create Post" />
      <div className="bg-white">
        <form
          className="align-left"
          onSubmit={handleCreatePost}>
          <div className="mb-3">
            <label
              className="form-label"
              htmlFor="fname">Post title:
            </label>
            <input
              className="form-control"
              type="text"
              name="post-title"
              placeholder="Post title" />
          </div>
          <div className="mb-3">
            <label
              className="form-label"
              htmlFor="fname">Post content:
            </label>
            <textarea
              className="form-control"
              type="text"
              name="post-content"
              placeholder="Post content"
              rows="8" />
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

export default CreatePostPage;
