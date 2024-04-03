import { RegisteredReactionValue } from "@desmoslabs/desmjs-types/desmos/reactions/v1/models";
import { MsgAddReaction } from "@desmoslabs/desmjs-types/desmos/reactions/v1/msgs";
import SuccessAlert from "@/components/Alert/SuccessAlert";
import ErrorAlert from "@/components/Alert/ErrorAlert";
import Keplr from "@/components/Main/Wallet/Keplr";
import { Reactions } from "@desmoslabs/desmjs";
import React, { useState } from "react";
import PropTypes from "prop-types";

const Like = ({ postId }) => {
  const [isLiking, setIsLiking] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);

  const handleToggleLike = async () => {
    setIsLiking(true);
    setError(null);
    setSuccess(null);

    try {
        const keplrData = await Keplr();

        const addReaction = {
          typeUrl: Reactions.v1.MsgAddReactionTypeUrl,
          value: MsgAddReaction.fromPartial({
            user: keplrData.signer.accountData.address,
            subspaceId: 21,
            postId,
            value: {
              typeUrl: "/desmos.reactions.v1.RegisteredReactionValue",
              value: RegisteredReactionValue.encode({
                registeredReactionId: 1
              })
            }
          })
        };

        const result = await keplrData.signAndBroadcast(addReaction.value.user, [addReaction], "auto");

        setSuccess(result);

        setLiked(!liked);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setIsLiking(false);
      }
  };

  return (
    <div className="align-self-center">
      <button className="d-flex p-0 btn" onClick={handleToggleLike} disabled={isLiking}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="align-self-center bi bi-caret-up-square" viewBox="0 0 16 16">
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
          <path d="M3.544 10.705A.5.5 0 0 0 4 11h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5a.5.5 0 0 0-.082.537"/>
        </svg>
        <p className="mx-2 mb-0">0</p>
      </button>

      <SuccessAlert success={success} />
      <ErrorAlert error={error} />
    </div>
  );
};

Like.propTypes = {
  postId: PropTypes.number.isRequired
};

export default Like;
