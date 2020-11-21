import dotenv from "dotenv";
dotenv.config();

import createKey from "../aws/kms/createKey.js";
import getMasterKeyIdFromAlias from "../aws/kms/masterKeyIdFromAlias.js";
import describeKey from "../aws/kms/describeKey.js";
import cancelDeleteAndEnable from "../aws/kms/reenableKey.js";
import createLoggingTable from "../aws/dynamodb/tables/createLoggingTable.js";
import createLogWritePolicy from "../aws/iam/policies/createLogWritePolicy.js";

const setup = async () => {
  createLoggingTable();
  createLogWritePolicy();

  // TODO: (1) move else out a level, (2) put this in its own function maybe?
  const keyId = await getMasterKeyIdFromAlias("LockitKey2"); //TODO Update to LockitKey

  if (keyId) {
    const keyInfo = await describeKey(keyId);

    if (keyInfo.KeyMetadata.KeyState === "PendingDeletion") {
      cancelDeleteAndEnable(keyId);
    } else {
      const description = "Here's your Lockit key!";
      createKey(description);
    }
  }
};

export default setup;
