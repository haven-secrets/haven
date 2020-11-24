const describeKey = async (AWS, keyId) => {
  const kms = new AWS.KMS();
  const params = {
    KeyId: keyId,
  };

  return kms.describeKey(params).promise();
};

export default describeKey;
