// TODO: pass in secretName, version, tableNme
// TODO: return something from getSecret (right now it just console logs)
import getItem from "../aws/dynamodb/getItem.js";
import decryptItem from "../aws/encryption/decryptItem.js";
import base64ToAscii from "../utils/base64ToAscii.js";
import constructTableName from "../utils/constructTableName.js";

const getSecret = async (project, environment, secretName) => {
  const version = "1";
  const tableName = constructTableName(project, environment);
  
  try {
    const encryptedSecret = await getItem(secretName, version, tableName);
    const decryptedSecretBlob = await decryptItem(encryptedSecret);
    const decryptedSecret = base64ToAscii(decryptedSecretBlob);

    console.log("decrypted secret:", decryptedSecret);
  } catch (error) {
    console.log(error, error.stack);
  }
};

export default getSecret;