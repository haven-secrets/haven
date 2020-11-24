const cancelDeleteAndEnable = async (AWS, keyId) => {
  const kms = new AWS.KMS();
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

export default cancelDeleteAndEnable;
