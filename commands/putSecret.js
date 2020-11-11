import putSecret from "../aws/dynamodb/putSecret.js";
import encryptSecret from "../aws/kms/encryptSecret.js";

const tableName = "MoreSecrets";
const secretName = "bar";
const plaintextSecret = "4";
const version = "1";

putSecret(secretName, plaintextSecret, version, tableName, encryptSecret);
