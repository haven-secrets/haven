// TODO: pass in arguments instead of using variables

import putItem from "../aws/dynamodb/putItem.js";
import encryptItem from "../aws/encryption/encryptItem.js";
import constructTableName from "../utils/constructTableName.js";
import putLoggingItem from "../aws/dynamodb/putLoggingItem.js";
import getLatestVersion from "../aws/dynamodb/getLatestVersion.js"
import putLatestVersion from "../aws/dynamodb/putLatestVersion.js"
import updateLatestVersion from "../aws/dynamodb/updateLatestVersion.js"

const putSecret = async (project, environment, secretName, plaintextSecret) => {
  const tableName = constructTableName(project, environment);
  let version = await getLatestVersion(tableName, secretName);
  if (version === "NO_TABLE") return;
  else if (!version) {
    console.log("Creating new secret");
    version = "1";
    await putLatestVersion(tableName, secretName);
  } else {
    console.log("Creating new version of secret");
    version = String(+version + 1);
    await updateLatestVersion(tableName, secretName, version);
  }

  try {
    // TODO: add success console logs
    const encryptedSecret = await encryptItem(plaintextSecret);
    await putItem(secretName, encryptedSecret, version, tableName);
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
