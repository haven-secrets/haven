import { kms } from "../services.js";
import createAlias from "./createAlias.js";

const createKey = async (description) => {
  const params = {
    Description: description, // TODO: do we still want this? it's not required
  };

  const key = await kms.createKey(params).promise();
  createAlias("HavenSecretsKey", key.KeyMetadata.KeyId); // TODO: return value?
}

export default createKey;
