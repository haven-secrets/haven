import { kms } from "../../aws/services.js";

const teardownKey = async (aliasName) => {
  const list = await kms.listAliases({}).promise();
  const havenKeyAlias = list.Aliases.find((alias) => {
  	return alias.AliasName === `alias/${aliasName}`;
  }); // TODO: call getMasterKey... for this

  return kms.scheduleKeyDeletion({
    KeyId: havenKeyAlias.TargetKeyId,
    PendingWindowInDays: "7",
  }).promise();
};

export default teardownKey;
