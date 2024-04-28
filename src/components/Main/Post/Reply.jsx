import { ReplySetting } from "@desmoslabs/desmjs-types/desmos/posts/v3/models";
import ReplyDesign from "@/components/Main/Post/ReplyDesign";
import { useNavigate, useParams } from "react-router-dom";
import SuccessAlert from "@/components/Alert/Success";
import Keplr from "@/components/Main/Wallet/Keplr";
import ErrorAlert from "@/components/Alert/Error";
import { useQuery } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import React, { useState } from "react";
import IpfsAdd from "@/utils/Ipfs/Add";

function Reply(postId) {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const REPLY_QUERY = gql`
      query GetPostsAndSections {
        post(where: { text: { _is_null: true } }) {
          id
          text
          subspace_section {
            name
            id
          }
          reactions {
            id
            value
            post_row_id
          }
          post_url {
            url
          }
        }
        subspace_section {
          name
          id
        }
      }
  `;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["postHomepage"],
    queryFn: async () => request("http://localhost:8080/v1/graphql/", REPLY_QUERY)
  });

  const { communityid } = useParams();
  const navigate = useNavigate();

  // Create a new post on the blockchain
  const handleCreateReply = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData(e.target);
      const keplrData = await Keplr();

      console.log(postId);

      const uploadResponse = await IpfsAdd(formData.get("post-content"));

      // The definition of the message MsgCreatePost
      const MsgCreatePost = {
        typeUrl: "/desmos.posts.v3.MsgCreatePost",
        value: {
          subspaceId: 21,
          section_id: communityid,
          author: keplrData.signer.accountData.address,
          replySettings: ReplySetting.REPLY_SETTING_EVERYONE,
          entities: {
            urls: [{
              start: "0",
              end: "1",
              url: "https://ipfs.desmos.network/ipfs/" + uploadResponse.Name,
              display_url: "IPFS"
            }]
          },
          conversationId: postId
        }
      };

      console.log(MsgCreatePost);

      const result = await keplrData.signAndBroadcast(MsgCreatePost.value.author, [MsgCreatePost], "auto");

      setSuccess(result);
      navigate("/");
    } catch (err) {
      setError(err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <p>No comments.</p>;

  console.log(data);

  return (
    <div>
      <h2 id="comments" className="m-3 h4 my-3 pb-5 custom-orange">Comments</h2>
        {data.post.map((post, index) => (
            <ReplyDesign key={post.id} post={post} index={index} post_page={false} />
        ))}
      <form action="" onSubmit={handleCreateReply}>
          <input className="form-control my-3" name="post-content" placeholder="Reply" />
          <button className="btn btn-secondary" type="submit">Submit</button>
      </form>
      {success && <SuccessAlert success={success} />}
      {error && <ErrorAlert error={error} />}
    </div>
  );
}

export default Reply;
