import dotenv from "dotenv";
dotenv.config();

import createKey from "../aws/kms/createKey.js";
import getMasterKeyIdFromAlias from "../aws/kms/masterKeyIdFromAlias.js";
import describeKey from "../aws/kms/describeKey.js";
import cancelDeleteAndEnable from "../aws/kms/reenableKey.js";
import createTable from "../aws/dynamodb/createTable.js";

const setup = async () => {
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