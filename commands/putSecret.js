// TODO: pass in arguments instead of using variables

import putItem from "../aws/dynamodb/items/putItem.js";
import encryptItem from "../aws/encryption/encryptItem.js";
import constructTableName from "../utils/constructTableName.js";
import putLoggingItem from "../aws/dynamodb/items/putLoggingItem.js";
import getLatestVersion from "../aws/dynamodb/items/getLatestVersion.js";
import updateItemAttribute from "../aws/dynamodb/items/updateItemAttribute.js";
import { keyAlias } from "../utils/config.js";

const putSecret = async (project, environment, secretName, plaintextSecret) => {
  if (secretName === undefined || plaintextSecret === undefined) {
    console.log("You must enter a secret and a secret value.");
    return;
  }
  const tableName = constructTableName(project, environment);
  let version = await getLatestVersion(secretName, tableName);

  if (version === "NO_TABLE") return;
  else if (!version) {
    console.log("Creating new secret");
    version = "1";
  } else {
    console.log("Creating new version of secret");
    await updateItemAttribute(secretName, version, tableName, "Latest", false);
    version = String(+version + 1);
  }

  try {
    // TODO: add success console logs
    const encryptedSecret = await encryptItem(
      String(plaintextSecret),
      keyAlias
    );
    await putItem(String(secretName), encryptedSecret, version, tableName);
    putLoggingItem(
      project,
      environment,
      "put",
      secretName,
      version,
      "Succcessful"
    );
  } catch (error) {
    console.log(error, error.stack);
    putLoggingItem(
      project,
      environment,
      "put",
      secretName,
      version,
      error.code
    );
  }
};

export default putSecret;
