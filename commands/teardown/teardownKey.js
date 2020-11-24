import { kms } from "../../aws/services.js";

const teardownKey = async (aliasName) => {
  const list = await kms.listAliases({}).promise();
  const lockitKeyAlias = list.Aliases.find(alias => {
  	return alias.AliasName === `alias/${aliasName}`;
  });

  return kms.scheduleKeyDeletion({
    KeyId: lockitKeyAlias.TargetKeyId,
    PendingWindowInDays: "7",
  }).promise();
};

export default teardownKey;
