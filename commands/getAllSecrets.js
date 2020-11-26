// TODO: handle Promise.all failure (catch)

import getItemsByFilter from "../aws/dynamodb/items/getItemsByFilter.js";
import decryptItem from "../aws/encryption/decryptItem.js";
import base64ToAscii from "../utils/base64ToAscii.js";
import constructTableName from "../utils/constructTableName.js";
import putLoggingItem from "../aws/dynamodb/items/putLoggingItem.js";

const getAllSecrets = async (project, environment) => {
  const tableName = constructTableName(project, environment);

  try {
    const data = await getItemsByFilter(tableName, "Latest");
    const encryptedSecretValues = data.Items.map((secret) => secret.SecretValue.B);
    const encryptedSecretsPromises = encryptedSecretValues.map((secret) =>
      decryptItem(secret)
    );

    const decryptedSecretsPromise = await Promise.all(encryptedSecretsPromises);
    const plaintextValues = decryptedSecretsPromise.map((plaintext) =>
      base64ToAscii(plaintext)
    );

    // return object of secrets (keys=secret names, values=secret plaintext values)
    const decryptedSecrets = data.Items.reduce(
      (object, encryptedSecret, index) => {
        const secretName = encryptedSecret.SecretName.S;
        const secretValue = plaintextValues[index];
        object[secretName] = secretValue;
        return object;
      },
      {}
    );

    // log success for getAll
    data.Items.forEach((item) => {
      const secretName = item.SecretName.S;
      const version = item.Version.S;

      putLoggingItem(project, environment, 'getAll', secretName, version, 'Succcessful');
    });

    // console.log(decryptedSecrets);
    return decryptedSecrets;
  } catch (error) {
    console.log(error.code, error, error.stack);
    putLoggingItem(project, environment, 'getAll', '', '', error.code);
  }
};

export default getAllSecrets;
