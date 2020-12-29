const getMasterKeyArnFromAlias = async (AWS, keyAlias, region) => {
  const kms = new AWS.KMS({ region });
  const list = await kms.listAliases({}).promise();
  const masterKey = list.Aliases.find((keyObj) =>
    keyObj.AliasName.startsWith(`alias/${keyAlias}`)
  );
  if (masterKey) {
    const masterKeyArn = masterKey.AliasArn.replace(
      /alias.*/,
      `key/${masterKey.TargetKeyId}`
    );

    return masterKeyArn;
  } else {
    return undefined;
  }
};

export default getMasterKeyArnFromAlias;
