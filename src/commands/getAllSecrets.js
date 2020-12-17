import getItemsByFilter from "../aws/dynamodb/items/getItemsByFilter.js";
import decryptItem from "../aws/encryption/decryptItem.js";
import base64ToAscii from "../utils/base64ToAscii.js";
import constructTableName from "../utils/constructTableName.js";
import putLoggingItem from "../aws/dynamodb/items/putLoggingItem.js";
import { keyAlias } from "../utils/config.js";

const decryptAllSecrets = async (items, tableName) => {
  const decryptedSecretsPromises = items.map((item) => {
    const secretName = item.SecretName.S;
    const secretValue = item.SecretValue.B;
    const version = item.Version.S;

    return decryptItem(secretName, secretValue, version, tableName, keyAlias);
  });

  const decryptedSecrets = await Promise.all(decryptedSecretsPromises);
  return decryptedSecrets.map((value) => base64ToAscii(value));
};

const getDecryptedSecretsObject = (items, decryptedSecrets) => {
  return items.reduce((object, item, index) => {
    const secretName = item.SecretName.S;
    const secretValue = decryptedSecrets[index];
    object[secretName] = secretValue;
    return object;
  }, {});
};

const log = (project, environment, items) => {
  items.forEach((item) => {
    const secretName = item.SecretName.S;
    const version = item.Version.S;
    putLoggingItem(
      project,
      environment,
      "getAll",
      secretName,
      version,
      "Succcessful"
    );
  });
};

const getAllSecrets = async (project, environment) => {
  try {
    const tableName = constructTableName(project, environment);
    const { Items: items } = await getItemsByFilter(tableName, "Latest");
    const decryptedSecrets = await decryptAllSecrets(items, tableName);
    const decryptedSecretsObject = await getDecryptedSecretsObject(
      items,
      decryptedSecrets
    );

    log(project, environment, items);
    const latestSecretsObj = items.map((item) => {
      return {
        SecretName: item.SecretName.S,
        SecretValue: decryptedSecretsObject[item.SecretName.S],
        Version: item.Version.S,
        Flagged: item.Flagged.BOOL,
      };
    });

    return latestSecretsObj;
  } catch (error) {
    console.log(`${error.code}: ${error.message}`);
    putLoggingItem(project, environment, "getAll", "", "", error.code);
    return error;
  }
};

export default getAllSecrets;
