import getItem from "../aws/dynamodb/getItem.js";
import decryptItem from "../aws/kms/decryptItem.js";
import base64ToAscii from "../utils/base64ToAscii.js";

const tableName = "MoreSecrets";
const secretName = "baz";
const version = "1";

const encryptedSecret = await getItem(secretName, version, tableName);
const decryptedSecretBlob = await decryptItem(encryptedSecret);
const decryptedSecret = base64ToAscii(decryptedSecretBlob);

console.log('decrypted secret:', decryptedSecret);