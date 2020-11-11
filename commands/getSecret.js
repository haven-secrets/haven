import getItem from "../aws/dynamodb/getItem.js";
import decryptItem from "../aws/kms/decryptItem.js";

const tableName = "MoreSecrets";
const secretName = "bar";
const version = "1";

const encryptedSecret = await getItem(secretName, version, tableName);
const decryptedSecret = await decryptItem(encryptedSecret);
console.log('decrypted secret:', decryptedSecret);
