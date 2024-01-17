import { DesmosClient, DesmosChains, SigningMode, GasPrice } from "@desmoslabs/desmjs";
import { KeplrSigner } from "@desmoslabs/desmjs-keplr";

async function Keplr() {
  if (window.keplr === undefined) {
    throw new Error("Veuillez installer l'extension web Keplr");
  }

  const signer = new KeplrSigner(window.keplr, {
    signingMode: SigningMode.DIRECT,
    chainInfo: DesmosChains.mainnet,
  });

  await signer.connect();

  const client = await DesmosClient.connectWithSigner('https://rpc.mainnet.desmos.network', signer, {
    gasPrice: GasPrice.fromString("0.01udsm"),
  });

  console.log(client);

  return client;
}

export default Keplr;