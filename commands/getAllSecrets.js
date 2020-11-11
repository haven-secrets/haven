// TODO: handle Promise.all failure (catch)

import getAllItems from "../aws/dynamodb/getAllItemsFromTable.js";
import decryptItem from "../aws/kms/decryptItem.js";
import base64ToAscii from "../utils/base64ToAscii.js";

const tableName = "MoreSecrets";

const encryptedSecrets = await getAllItems(tableName);
const encryptedSecretValues = encryptedSecrets.Items.map(secret => secret.SecretValue.B);
const encryptedSecretsPromises = encryptedSecretValues.map(secret => decryptItem(secret));

const decryptedSecretsPromise = await Promise.all(encryptedSecretsPromises);
const plaintextValues = decryptedSecretsPromise.map(plaintext => base64ToAscii(plaintext));
 
// return object of secrets (keys=secret names, values=secret plaintext values)
const decryptedSecrets = encryptedSecrets.Items.reduce((object, encryptedSecret, index) => {
	const secretName = encryptedSecret.SecretName.S;
	const secretValue = plaintextValues[index];
	object[secretName] = secretValue;
	return object;
}, {});

console.log('decrypted secrets:', decryptedSecrets);
