import createKeyring from "./createKeyring.js";
import { buildClient, CommitmentPolicy } from "@aws-crypto/client-node";

const { encrypt } = buildClient(CommitmentPolicy.REQUIRE_ENCRYPT_REQUIRE_DECRYPT);

const encryptItem = async (secretName, secretValue, version, tableName, keyAlias) => {
  const keyring = await createKeyring(keyAlias);

  const context = {
    partitionKey: secretName,
    sortKey: version,
    table: tableName,
  };

  const { result } = await encrypt(keyring, secretValue, { encryptionContext: context });

  return result;
};

export default encryptItem;
