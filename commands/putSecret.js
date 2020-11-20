// TODO: pass in arguments instead of using variables

import putItem from "../aws/dynamodb/putItem.js";
import encryptItem from "../aws/encryption/encryptItem.js";
import constructTableName from "../utils/constructTableName.js";

const putSecret = async (project, environment, secretName, plaintextSecret) => {
  const version = "1"; // TODO: don't hardcode version
  const tableName = constructTableName(project, environment);

  try {
    // TODO: add success console logs
    const encryptedSecret = await encryptItem(plaintextSecret);
    await putItem(secretName, encryptedSecret, version, tableName);
  } catch (error) {
    console.log(error, error.stack);
  }
};

export default putSecret;
