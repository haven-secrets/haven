// TODO: pass in secretName, version, tableNme
// TODO: return something from getSecret (right now it just console logs)

import getItem from "../aws/dynamodb/getItem.js";
import decryptItem from "../aws/encryption/decryptItem.js";
import base64ToAscii from "../utils/base64ToAscii.js";
import constructTableName from "../utils/constructTableName.js";
import putLoggingItem from "../aws/dynamodb/putLoggingItem.js";
import getLatestVersion from "../aws/dynamodb/getLatestVersion.js";

const getSecret = async (project, environment, secretName, version) => {
  const tableName = constructTableName(project, environment);
  if (!version) version = await getLatestVersion(tableName, secretName); // Version was not passed in
  if (!version) return; // Secret does not exist
  version = String(version);

  try {
    const encryptedSecret = await getItem(secretName, version, tableName);
    const decryptedSecretBlob = await decryptItem(encryptedSecret);
    const decryptedSecret = base64ToAscii(decryptedSecretBlob);

    console.log("decrypted secret:", decryptedSecret);
    putLoggingItem(
      project,
      environment,
      "get",
      secretName,
      version,
      "Succcessful"
    );
  } catch (e) {
    // console.log(e, e.stack);
    if (e.message === "Cannot read property 'SecretValue' of undefined") {
      console.log("This version does not exist");
      return;
    }
    putLoggingItem(
      project,
      environment,
      "get",
      secretName,
      version,
      error.code
    );
  }
};

export default getSecret;
