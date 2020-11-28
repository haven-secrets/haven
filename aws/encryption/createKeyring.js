import getMasterKeyFromAlias from "../kms/getMasterKeyFromAlias.js";
import { KmsKeyringNode } from "@aws-crypto/client-node";

// TODO: generate keyring on setup and keep a copy of it somewhere
const createKeyring = async (keyAlias) => {
  const masterKey = await getMasterKeyFromAlias(keyAlias);
  const generatorKeyId = masterKey.AliasArn.replace(/alias.*/, `key/${masterKey.TargetKeyId}`);
  return new KmsKeyringNode({ generatorKeyId });
};

export default createKeyring;
