// TODO: use key alias instead of key ID
//	(Right now you have to run *only* createKey, manually save the key ID
//	 in .env, and then run setup again, commenting out createKey)
// TODO: change hardcoding of description

import dotenv from 'dotenv';
dotenv.config();

import createKey from "../aws/kms/createKey.js";
import generateEncryptSecretPolicy from "../aws/iam/policies/encryptSecretPolicy.js";
import generateDecryptSecretPolicy from "../aws/iam/policies/decryptSecretPolicy.js";

const description = "Here's your Lockit key!";
const region = process.env["REGION"];
const accountNumber = process.env["ACCOUNT_NUMBER"];
const keyId = process.env["KEYID"];

const setup = () => {
	createKey(description);
	// generateEncryptSecretPolicy(region, accountNumber, keyId);
	// generateDecryptSecretPolicy(region, accountNumber, keyId);
};

export default setup;