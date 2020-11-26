import getMasterKeyArnFromAlias from "../kms/getMasterKeyArnFromAlias.js";
import { KmsKeyringNode } from "@aws-crypto/client-node";

// TODO: generate keyring on setup and keep a copy of it somewhere
const createKeyring = async (secret) => {
  const generatorKeyId = await getMasterKeyArnFromAlias("HavenSecretsKey");
  return new KmsKeyringNode({ generatorKeyId });
};

export default createKeyring;
