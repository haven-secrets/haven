import { kms } from "../services.js";

const createAlias =  async (aliasName, keyId) => {
  const params = {
    AliasName: `alias/${aliasName}`,
    TargetKeyId: keyId,
  };

  await kms.createAlias(params).promise();
  console.log(`Your Haven master key is called ${aliasName}`); // TODO: return value?
}

export default createAlias;
