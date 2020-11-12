import putItem from "../aws/dynamodb/putItem.js";
import encryptItem from "../aws/kms/encryptItem.js";

const tableName = "MoreSecrets";
const secretName = "baz";
const plaintextSecret = "44";
const version = "1";

(async () => {
  try {
    // TODO: add success console logs
    const encryptionData = await encryptItem(plaintextSecret);
    const encryptedSecret = encryptionData.CiphertextBlob;

    await putItem(secretName, encryptedSecret, version, tableName);
  } catch (error) {
    console.log(error, error.stack);
  }
})();