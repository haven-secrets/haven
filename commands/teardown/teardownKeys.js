import { kms } from "../../aws/services.js";

const teardownKeys = async () => {
  const list = await kms.listAliases({}).promise();
  return list.Aliases.filter((alias) =>
    /^alias\/Lockit.*/.test(alias.AliasName)
  ).map((alias) =>
    kms
      .scheduleKeyDeletion({
        KeyId: alias.TargetKeyId,
        PendingWindowInDays: "7",
      })
      .promise()
  );
};

export default teardownKeys;
