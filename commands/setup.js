import getMasterKeyIdFromAlias from "../aws/kms/getMasterKeyIdFromAlias.js";
import describeKey from "../aws/kms/describeKey.js";
import reenableKey from "../aws/kms/reenableKey.js";
import createKey from "../aws/kms/createKey.js";
import createLoggingStack from "../aws/cloudformation/createLoggingStack.js";

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

const loggingTableName = "LockitLogging"; // TODO: don't hardcode here
const loggingPolicyName = "LockitLogWritePolicy"; // ditto
const loggingGroupName = "LockitLogGroup"; // dittoditto

const setup = () => {
  createLoggingStack(loggingGroupName, loggingPolicyName, loggingTableName);
  setupKey();
};

export default setup;
