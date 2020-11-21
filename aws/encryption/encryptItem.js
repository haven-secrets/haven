import createKeyring from "./createKeyring.js";
import { buildClient, CommitmentPolicy } from "@aws-crypto/client-node";

const { encrypt } = buildClient(CommitmentPolicy.REQUIRE_ENCRYPT_REQUIRE_DECRYPT);

const encryptItem = async secret => {
  const keyring = await createKeyring();
  const { result } = await encrypt(keyring, secret);
  return result;
};

export default encryptItem;