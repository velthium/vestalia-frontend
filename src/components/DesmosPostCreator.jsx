import React, { useState } from "react";
import Long from "long";
import { ReplySetting } from "@desmoslabs/desmjs-types/desmos/posts/v3/models";
import { MsgCreatePost } from "@desmoslabs/desmjs-types/desmos/posts/v3/msgs";
import { OfflineSignerAdapter, SigningMode } from "@desmoslabs/desmjs";
import { DesmosClient, GasPrice, Posts } from "@desmoslabs/desmjs";

const DesmosPostCreator = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postText, setPostText] = useState("");
  const [submitResult, setSubmitResult] = useState(null);

  const handlePostSubmit = async () => {
    setIsSubmitting(true);
    try {
      const mnemonic = "vocal solid animal toast someone invite grape snap praise husband iron lawsuit";

      // Remplacez ceci par votre propre signer
      const signer = await OfflineSignerAdapter.fromMnemonic(SigningMode.DIRECT, mnemonic);
      
      const client = await DesmosClient.connectWithSigner(
        'https://rpc.mainnet.desmos.network', 
        signer, {
          gasPrice: GasPrice.fromString("0.01udsm"),
        }
      );

      const createPost = {
        typeUrl: Posts.v3.MsgCreatePostTypeUrl,
        value: MsgCreatePost.fromPartial({
          subspaceId: Long.fromNumber(1),
          author: "desmos1htyqkum6esle9zx7f4e3cfrmzwmyhn4p75pw6c", // Remplacez par votre adresse Desmos
          text: postText,
          replySettings: ReplySetting.REPLY_SETTING_EVERYONE
        })
      };

      const result = await client.signAndBroadcast(createPost.value.author, [createPost], "auto");
      setSubmitResult(result);
    } catch (error) {
        console.error("Error submitting post:", error.message);
        console.error("Error submitting post:", error.stack);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Create a Desmos Post</h2>
      <textarea
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        placeholder="Write your post content here..."
      />
      <button onClick={handlePostSubmit} disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Post"}
      </button>
      {submitResult && <p>Post submitted! Result: {JSON.stringify(submitResult)}</p>}
    </div>
  );
};

export default DesmosPostCreator;
