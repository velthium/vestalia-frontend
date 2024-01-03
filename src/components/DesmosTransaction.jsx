import React, { useState } from "react";
import {
  DesmosClient,
  SigningMode,
  OfflineSignerAdapter,
  assertIsDeliverTxSuccess
} from "@desmoslabs/desmjs";

const DesmosTransaction = () => {
  const [transactionResult, setTransactionResult] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const handleSendTokens = async () => {
    setIsSending(true);

    try {
      const mnemonic =
        "vocal solid animal toast someone invite grape snap praise husband iron lawsuit";
      const rpcEndpoint = "https://rpc.mainnet.desmos.network:443";
      const signer = await OfflineSignerAdapter.fromMnemonic(
        SigningMode.DIRECT,
        mnemonic
      );
      const [firstAccount] = await signer.getAccounts();

      const client = await DesmosClient.connectWithSigner(
        rpcEndpoint,
        signer
      );

      const recipient = "desmos1ptvq7l4jt7n9sc3fky22mfvc6waf2jd8nuc0jv";
      const amount = {
        denom: "udsm",
        amount: "1337420"
      };

      console.log(firstAccount.address)
      console.log(recipient)
      console.log([amount])

      const result = await client.sendTokens(
        firstAccount.address,
        recipient,
        [amount],
        "Have fun with your coins"
      );

      setTransactionResult(result);
    } catch (error) {
      console.error("Error sending tokens:", error.message);
      console.error("Stack trace:", error.stack);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <h2>Desmos Transaction</h2>
      <button onClick={handleSendTokens} disabled={isSending}>
        {isSending ? "Sending..." : "Send Tokens"}
      </button>
      {transactionResult && (
        <p>Transaction Hash: {transactionResult.hash}</p>
      )}
    </div>
  );
};

export default DesmosTransaction;