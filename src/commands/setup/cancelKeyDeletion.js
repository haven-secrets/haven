const cancelKeyDeletion = async (AWS, keyId, region) => {
  const kms = new AWS.KMS({ region });
  const params = { KeyId: keyId };

  kms.cancelKeyDeletion(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else {
      kms.enableKey(params, function (err, data) {
        if (err) console.log(err, err.stack);
      });
    }
  });
};

export default cancelKeyDeletion;
