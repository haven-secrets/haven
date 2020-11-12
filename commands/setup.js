import dotenv from "dotenv";
dotenv.config();

import createKey from "../aws/kms/createKey.js";
import generateEncryptSecretPolicy from "../aws/iam/policies/encryptSecretPolicy.js";
import generateDecryptSecretPolicy from "../aws/iam/policies/decryptSecretPolicy.js";
import createTable from "../aws/dynamodb/createTable.js";

const description = "Here's your Lockit key!";
const region = process.env["REGION"];
const accountNumber = process.env["ACCOUNT_NUMBER"];
const keyId = process.env["KEYID"];

// createKey(description);
generateEncryptSecretPolicy(region, accountNumber, keyId);
generateDecryptSecretPolicy(region, accountNumber, keyId);
createTable("MoreSecrets");
