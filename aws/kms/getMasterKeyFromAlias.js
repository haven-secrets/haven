import { kms } from "../services.js";
import listAliases from "./listAliases.js";

const getMasterKeyFromAlias = async (aliasName) => {
  const list = await listAliases();
  const masterKey = list.Aliases.find((keyObj) => keyObj.AliasName === `alias/${aliasName}`);
  return masterKey;
};

export default getMasterKeyFromAlias;
