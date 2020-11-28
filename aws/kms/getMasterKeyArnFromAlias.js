/* DEPRECATED */

// import { kms } from "../services.js";
// import listAliases from "./listAliases.js";

// const getMasterKeyArnFromAlias = async (keyAlias) => {
//   const list = await listAliases();
//   const masterKey = list.Aliases.find((keyObj) => keyObj.AliasName.startsWith(`alias/${keyAlias}`));
//   const masterKeyArn = masterKey.AliasArn.replace(/alias.*/, `key/${masterKey.TargetKeyId}`);
//   return masterKeyArn;
// };

// export default getMasterKeyArnFromAlias;
