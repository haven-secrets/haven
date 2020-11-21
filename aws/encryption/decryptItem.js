import createKeyring from "./createKeyring.js";
import { buildClient, CommitmentPolicy } from "@aws-crypto/client-node";

const { decrypt } = buildClient(CommitmentPolicy.REQUIRE_ENCRYPT_REQUIRE_DECRYPT);

const decryptItem = async secret => {
  const keyring = await createKeyring();
  const { plaintext } = await decrypt(keyring, secret);
  return plaintext;
}

export default decryptItem;