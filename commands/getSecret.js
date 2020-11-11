import getSecret from "../aws/dynamodb/getSecret.js";
import decryptSecret from "../aws/kms/decryptSecret.js";

const tableName = "MoreSecrets";
const secretName = "bar";
const version = "1";

getSecret(secretName, version, tableName, decryptSecret);
