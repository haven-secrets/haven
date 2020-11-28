import { kms } from "../services.js";
import createAlias from "./createAlias.js";

const createKey = async (description, keyAlias) => {
  const params = {
    Description: description, // TODO: do we still want this? it's not required
  };

  const key = await kms.createKey(params).promise();
  createAlias(keyAlias, key.KeyMetadata.KeyId); // TODO: return value?
}

export default createKey;
