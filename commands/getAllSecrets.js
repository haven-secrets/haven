// TODO: handle Promise.all failure (catch)

import getAllItems from "../aws/dynamodb/getAllItems.js";
import decryptItem from "../aws/encryption/decryptItem.js";
import base64ToAscii from "../utils/base64ToAscii.js";
import constructTableName from "../utils/constructTableName.js";

const getAllSecrets = async (project, environment) => {
  const version = '1'; // TODO: (1) *use* this, and (2) replace this hardcoding
  const tableName = constructTableName(project, environment);
  
  try {
    const encryptedSecrets = await getAllItems(tableName);
    const encryptedSecretValues = encryptedSecrets.Items.map(
      (secret) => secret.SecretValue.B
    );
    const encryptedSecretsPromises = encryptedSecretValues.map((secret) =>
      decryptItem(secret)
    );

    const decryptedSecretsPromise = await Promise.all(encryptedSecretsPromises);
    const plaintextValues = decryptedSecretsPromise.map((plaintext) =>
      base64ToAscii(plaintext)
    );

    // return object of secrets (keys=secret names, values=secret plaintext values)
    const decryptedSecrets = encryptedSecrets.Items.reduce(
      (object, encryptedSecret, index) => {
        const secretName = encryptedSecret.SecretName.S;
        const secretValue = plaintextValues[index];
        object[secretName] = secretValue;
        return object;
      },
      {}
    );

    // console.log(decryptedSecrets);
    return decryptedSecrets;
  } catch (error) {
    console.log(error, error.stack);
  }
};

export default getAllSecrets;