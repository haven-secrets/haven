import createKeyring from "./createKeyring.js";
import { buildClient, CommitmentPolicy } from "@aws-crypto/client-node";

const { decrypt } = buildClient(CommitmentPolicy.REQUIRE_ENCRYPT_REQUIRE_DECRYPT);

const validContext = (encryptionContext, secretName, version, tableName) => {
  const { partitionKey, sortKey, table } = encryptionContext;
  return partitionKey === secretName
         && sortKey === version
         && table === tableName;
}

const decryptItem = async (secretName, secretValue, version, tableName, keyAlias) => {
// TODO: make sure to pass in correct context from getSecret and getAllSecrets
// and make sure a version is always specified in those files and passed in here
// (because we just look for the "Latest" version when a version isn't specified)
  const keyring = await createKeyring(keyAlias);
  const { plaintext, messageHeader } = await decrypt(keyring, secretValue);
  const { encryptionContext } = messageHeader;
  
  if (!validContext(encryptionContext, secretName, version, tableName)) {
    // TODO: throw a more specific error and message
    throw new Error("Encryption Context does not match expected values");
  }

  return plaintext;
}

export default decryptItem;
