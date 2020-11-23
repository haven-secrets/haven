import getMasterKeyIdFromAlias from "../aws/kms/getMasterKeyIdFromAlias.js";
import describeKey from "../aws/kms/describeKey.js";
import reenableKey from "../aws/kms/reenableKey.js";
import createKey from "../aws/kms/createKey.js";
import createLoggingTable from "../aws/dynamodb/tables/createLoggingTable.js";
import createLogWritePolicy from "../aws/iam/policies/createLogWritePolicy.js";

// TODO: move this function to another file, possibly in a setup folder
const setupKey = async () => {
  const keyId = await getMasterKeyIdFromAlias("LockitKey2"); // TODO: update to LockitKey

  if (keyId) {
    const keyData = await describeKey(keyId);
    if (keyData.KeyMetadata.KeyState === "PendingDeletion") reenableKey(keyId);
  } else {
    createKey("Here's your Lockit key!");
  }
};

const setup = () => {
  createLoggingTable();
  createLogWritePolicy();
  setupKey();
};

export default setup;