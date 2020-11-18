import getMasterKeyArnFromAlias from "../kms/getMasterKeyArnFromAlias.js";
import { KmsKeyringNode, buildClient, CommitmentPolicy } from "@aws-crypto/client-node";

const { decrypt } = buildClient(CommitmentPolicy.REQUIRE_ENCRYPT_REQUIRE_DECRYPT);

const decryptItem = async (secret) => {
  const generatorKeyId = await getMasterKeyArnFromAlias('LockitKey2') // TODO: just Lockit
  const keyring = new KmsKeyringNode({ generatorKeyId });
  const { plaintext } = await decrypt(keyring, secret);

  return Promise.resolve(plaintext);
}

export default decryptItem;