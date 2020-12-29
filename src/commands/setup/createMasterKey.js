const createMasterKey = async (AWS, description, keyAlias, region) => {
  const kms = new AWS.KMS({ region });

  const keyParams = {
    Description: description,
  };

  const key = await kms.createKey(keyParams).promise();

  const targetKeyId = key.KeyMetadata.KeyId;
  const aliasParams = {
    AliasName: `alias/${keyAlias}`,
    TargetKeyId: targetKeyId,
  };

  return await kms.createAlias(aliasParams).promise();
};

export default createMasterKey;
