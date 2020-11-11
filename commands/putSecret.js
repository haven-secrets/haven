import putSecret from "../aws/dynamodb/putSecret.js";

const tableName = "DevSecrets";
const secretName = "NewSecret2";
const plaintextSecret = "HelloWorlds";
const version = "1";

putSecret(secretName, plaintextSecret, version, tableName);
