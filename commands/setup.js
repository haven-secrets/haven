import dotenv from "dotenv";
dotenv.config();

import createKey from "../aws/kms/createKey.js";
import generateEncryptSecretPolicy from "../aws/iam/policies/encryptSecretPolicy.js";
import generateDecryptSecretPolicy from "../aws/iam/policies/decryptSecretPolicy.js";
import getMasterKeyIdFromAlias from "../aws/kms/masterKeyIdFromAlias.js";
import describeKey from "../aws/kms/describeKey.js";
import cancelDeleteAndEnable from "../aws/kms/reenableKey.js";
import createTable from "../aws/dynamodb/createTable.js";

const description = "Here's your Lockit key!";
const region = process.env["REGION"];
const accountNumber = process.env["ACCOUNT_NUMBER"];
const keyId = process.env["KEYID"];

const setup = async () => {
  const keyId = await getMasterKeyIdFromAlias("LockitKey2"); //TODO Update to LockitKey
  if (keyId) {
    const keyInfo = await describeKey(keyId);
    if (keyInfo.KeyMetadata.KeyState === "PendingDeletion") {
      cancelDeleteAndEnable(keyId);
    }
  } else {
    createKey(description);
  }
  generateEncryptSecretPolicy(region, accountNumber, keyId);
  generateDecryptSecretPolicy(region, accountNumber, keyId);
};

export default setup;
