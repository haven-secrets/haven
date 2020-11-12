import { kms } from "../services.js";
import listKeyAliases from "./listAliases.js";

const getMasterKeyIdFromAlias = async (keyAlias) => {
  const keyAliasObject = await listKeyAliases(); //

  const foundKey = keyAliasObject.Aliases.filter(
    (keyObj) => keyObj.AliasName === `alias/${keyAlias}`
  );

  return foundKey[0]?.TargetKeyId;
};

export default getMasterKeyIdFromAlias;
