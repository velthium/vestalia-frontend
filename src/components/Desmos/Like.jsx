import { RegisteredReactionValue } from "@desmoslabs/desmjs-types/desmos/reactions/v1/models";
import SuccessAlert from "@/components/Alert/SuccessAlert";
import ErrorAlert from "@/components/Alert/ErrorAlert";
import Keplr from "@/components/Wallet/Keplr";
import { Reactions } from '@desmoslabs/desmjs';
import React, { useState } from 'react';
import Long from "long";

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


      if (liked) {
        reactionValueAny.packString('unlike');
      }

      else {
        const keplrData = await Keplr();

        const addReaction = {
          typeUrl: Reactions.v1.MsgAddReactionTypeUrl,
          value: ({
              user: keplrData.signer.accountData.address,
              postId: postId,
              subspaceId: Long.fromNumber(21),
              value: {
                typeUrl: "/desmos.reactions.v1.RegisteredReactionValue",
                value: RegisteredReactionValue.encode({
                  registeredReactionId: 1,
                }).finish()
              }
          })
        };


        const result = await keplrData.signAndBroadcast(addReaction.value.user, [addReaction], "auto");
        console.log(result)

        setSuccess(response);

        setLiked(!liked);
      }

      } catch (err) {
        console.log(err)
        setError(err);
      } finally {
        setIsLiking(false);
      }
  };

  return (
    <div className="">
      <button className="d-flex me-3 py-0 btn btn-success text-light" onClick={handleToggleLike} disabled={isLiking}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="align-self-center bi bi-lightning-charge" viewBox="0 0 16 16">
          <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09zM4.157 8.5H7a.5.5 0 0 1 .478.647L6.11 13.59l5.732-6.09H9a.5.5 0 0 1-.478-.647L9.89 2.41z"/>
        </svg>
        <p className="mx-1 mb-0">0</p>
      </button>

      <SuccessAlert success={success} />
      <ErrorAlert error={error} />
    </div>
  );
};

export default Like;
