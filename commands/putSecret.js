// TODO: pass in arguments instead of using variables

import putItem from "../aws/dynamodb/putItem.js";
import encryptItem from "../aws/kms/encryptItem.js";

const putSecret = async() => {
	const tableName = "MoreSecrets";
	const secretName = "qux";
	const plaintextSecret = "45";
	const version = "1";

	const encryptionData = await encryptItem(plaintextSecret);
	const encryptedSecret = encryptionData.CiphertextBlob;

	// TODO: handle success and error
	putItem(secretName, encryptedSecret, version, tableName);
};

export default putSecret;