// TODO: pass in secretName, version, tableNme
// TODO: return something from getSecret (right now it just console logs)

import getItem from "../aws/dynamodb/items/getItem.js";
import decryptItem from "../aws/encryption/decryptItem.js";
import base64ToAscii from "../utils/base64ToAscii.js";
import constructTableName from "../utils/constructTableName.js";
import putLoggingItem from "../aws/dynamodb/items/putLoggingItem.js";
import getLatestVersion from "../aws/dynamodb/items/getLatestVersion.js";

const getSecret = async (project, environment, secretName, version) => {
  const tableName = constructTableName(project, environment);
  version = version ? String(version) : "";

  try {
    const result = await getItem(secretName, tableName, version);
    const encryptedSecret = version ? result.Item.SecretValue.B : result.Items[0].SecretValue.B;
    const decryptedSecretBlob = await decryptItem(secretName, encryptedSecret, version, tableName);
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
    putLoggingItem(project, environment, "get", secretName, version, e.code);
  }
};

export default getSecret;
