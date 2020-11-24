import { kms } from "../services.js";
import listAliases from "./listAliases.js";

const getMasterKeyIdFromAlias = async keyAlias => {
  const list = await listAliases();
  const masterKey = list.Aliases.find(keyObj => keyObj.AliasName === `alias/${keyAlias}`);
  if (masterKey) return masterKey.TargetKeyId;
};

export default getMasterKeyIdFromAlias;
