// TODO: remove hardcoding of event type and success message?

import getItem from "../aws/dynamodb/items/getItem.js";
import decryptItem from "../aws/encryption/decryptItem.js";
import base64ToAscii from "../utils/base64ToAscii.js";
import constructTableName from "../utils/constructTableName.js";
import putLoggingItem from "../aws/dynamodb/items/putLoggingItem.js";
import { keyAlias } from "../utils/config.js";

const getSecret = async (project, environment, secretName, version = "") => {
  try {
    const tableName = constructTableName(project, environment);
    version = String(version);

    const result = await getItem(secretName, tableName, version);
    const encryptedSecret = version
      ? result.Item?.SecretValue.B
      : result.Items[0].SecretValue.B;
    if (!version) version = result.Items[0].Version.S;
    if (!encryptedSecret)
      return console.log("The specified secret does not exist");
    const decryptedSecretBlob = await decryptItem(
      secretName,
      encryptedSecret,
      version,
      tableName,
      keyAlias
    );

    const decryptedSecret = base64ToAscii(decryptedSecretBlob);

    // TODO: specify what the latest version is if a version wasn't passed in
    putLoggingItem(
      project,
      environment,
      "get",
      secretName,
      version,
      "Succcessful"
    );

    console.log("Decrypted secret: ", decryptedSecret);
    return decryptedSecret;
  } catch (error) {
    console.log(`${error.code}: ${error.message}`);
    putLoggingItem(
      project,
      environment,
      "get",
      secretName,
      version,
      error.code
    );
    return error;
  }
};

export default getSecret;
