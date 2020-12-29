const describeKey = async (AWS, keyId, region) => {
  const kms = new AWS.KMS({ region });
  const params = {
    KeyId: keyId,
  };

  return kms.describeKey(params).promise();
};

export default describeKey;
