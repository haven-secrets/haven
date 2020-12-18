import constructTableName from "../utils/constructTableName.js";
import getLatestVersion from "../aws/dynamodb/items/getLatestVersion.js";
import updateItemAttribute from "../aws/dynamodb/items/updateItemAttribute.js";
import encryptItem from "../aws/encryption/encryptItem.js";
import putItem from "../aws/dynamodb/items/putItem.js";
import putLoggingItem from "../aws/dynamodb/items/putLoggingItem.js";
import { keyAlias } from "../utils/config.js";

const getVersion = async (secretName, tableName) => {
  const version = await getLatestVersion(secretName, tableName);

  if (version) {
    await updateItemAttribute(secretName, version, tableName, "Latest", false);
    return String(Number(version) + 1);
  } else {
    return "1";
  }
};

const putSecret = async (project, environment, secretName, secretValue) => {
  let version = "";

  try {
    const tableName = constructTableName(project, environment);
    version = await getVersion(secretName, tableName);

    const encryptedSecret = await encryptItem(secretName, secretValue, version, tableName, keyAlias);
    await putItem(secretName, encryptedSecret, version, tableName);

    putLoggingItem(project, environment, "put", secretName, version, "Successful");
  } catch (error) {
    console.log(`${error.code}: ${error.message}`);
    putLoggingItem(project, environment, "put", secretName, version, error.code);
    return error;
  }
};

export default putSecret;
