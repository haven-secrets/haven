import { keyAlias } from "./config.js";
import getMasterKeyFromAlias from "../aws/kms/getMasterKeyFromAlias.js";

const getKeyId = async () => {
	const key = await getMasterKeyFromAlias(keyAlias);
	return key.TargetKeyId;
};

export default getKeyId;