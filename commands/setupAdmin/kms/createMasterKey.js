const createMasterKey = (AWS, description, alias) => {
  const kms = new AWS.KMS();

  const params = {
    Description: description,
  };

  kms.createKey(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else {
      const targetKeyId = data.KeyMetadata.KeyId;

      const params = {
        AliasName: `alias/${keyAlias}`,
        TargetKeyId: targetKeyId,
      };

      kms.createAlias(params, function (err, data) {});
    }
  });
};

export default createMasterKey;
