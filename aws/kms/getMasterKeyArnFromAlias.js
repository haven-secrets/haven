// TODO: maybe this code is unnecessary if we've found a way to not hardcode account numbers and regions

import { kms } from "../services.js";
import listAliases from "./listAliases.js";

const getMasterKeyArnFromAlias = async keyAlias => {
  const list = await listAliases();
  const masterKey = list.Aliases.find(keyObj => keyObj.AliasName.startsWith(`alias/${keyAlias}`));
  const masterKeyArn = masterKey.AliasArn.replace(/alias.*/, `key/${masterKey.TargetKeyId}`);
  return masterKeyArn;
};

export default getMasterKeyArnFromAlias;