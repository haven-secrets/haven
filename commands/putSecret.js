import putItem from "../aws/dynamodb/putItem.js";
import encryptItem from "../aws/kms/encryptItem.js";

const tableName = "MoreSecrets";
const secretName = "baz";
const plaintextSecret = "44";
const version = "1";

const encryptionData = await encryptItem(plaintextSecret);
const encryptedSecret = encryptionData.CiphertextBlob;

// TODO: handle success and error
putItem(secretName, encryptedSecret, version, tableName);