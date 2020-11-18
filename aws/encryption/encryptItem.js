import getMasterKeyArnFromAlias from "../kms/getMasterKeyArnFromAlias.js";
import { KmsKeyringNode, buildClient, CommitmentPolicy } from "@aws-crypto/client-node";

const { encrypt } = buildClient(CommitmentPolicy.REQUIRE_ENCRYPT_REQUIRE_DECRYPT);

const encryptItem = async (secret) => {
  const generatorKeyId = await getMasterKeyArnFromAlias('LockitKey2') // TODO: just Lockit
  const keyring = new KmsKeyringNode({ generatorKeyId });
  const { result } = await encrypt(keyring, secret);

  return Promise.resolve(result);
};

export default encryptItem;