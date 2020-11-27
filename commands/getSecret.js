// TODO: remove hardcoding of event type and success message?

import getItem from "../aws/dynamodb/items/getItem.js";
import decryptItem from "../aws/encryption/decryptItem.js";
import base64ToAscii from "../utils/base64ToAscii.js";
import constructTableName from "../utils/constructTableName.js";
import putLoggingItem from "../aws/dynamodb/items/putLoggingItem.js";

const getSecret = async (project, environment, secretName, version = "") => {
  try {
    const tableName = constructTableName(project, environment);
    version = String(version);

    const result = await getItem(secretName, tableName, version);
    const item = result.Items ? result.Items[0] : result.Item;

    if (!item) return console.log("The specified secret does not exist");

    const encryptedSecret = item.SecretValue.B;
    if (!version) version = item.Version.S;

    const decryptedSecretBlob = await decryptItem(secretName, encryptedSecret, version, tableName);
    const decryptedSecret = base64ToAscii(decryptedSecretBlob);

    putLoggingItem(project, environment, "get", secretName, version, "Succcessful");

    console.log("Decrypted secret: ", decryptedSecret);
    return decryptedSecret;
  } catch (error) {
    console.log(`${error.code}: ${error.message}`);
    putLoggingItem(project, environment, "get", secretName, version, error.code);
    return error;
  }
};

export default getSecret;
