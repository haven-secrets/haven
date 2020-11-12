// TODO: pass in arguments instead of using variables

import putItem from "../aws/dynamodb/putItem.js";
import encryptItem from "../aws/kms/encryptItem.js";

const putSecret = async (tableName, secretName, plaintextSecret) => {
  const version = "1"; // TODO: don't hardcode version

  try {
    // TODO: add success console logs
    const encryptionData = await encryptItem(plaintextSecret);
    const encryptedSecret = encryptionData.CiphertextBlob;

    await putItem(secretName, encryptedSecret, version, tableName);
  } catch (error) {
    console.log(error, error.stack);
  }
};

export default putSecret;
