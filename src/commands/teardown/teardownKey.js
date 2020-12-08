import { createHavenKms } from "../../aws/services.js";
import getMasterKeyFromAlias from "../../aws/kms/getMasterKeyFromAlias.js";

const teardownKey = async (aliasName) => {
  const masterKey = await getMasterKeyFromAlias(aliasName);
  const keyId = masterKey.TargetKeyId;

  const params = {
    KeyId: keyId,
    PendingWindowInDays: "7",
  };

  return createHavenKms().scheduleKeyDeletion(params).promise();
};

export default teardownKey;
