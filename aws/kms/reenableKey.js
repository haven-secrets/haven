import { kms } from "../services.js";

const cancelDeleteAndEnable = async (keyId) => {
  const params = { KeyId: keyId };

  kms.cancelKeyDeletion(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else {
      kms.enableKey(params, function (err, data) {
        if (err) console.log(err, err.stack);
        // an error occurred
      });
    }
  });
};

export default cancelDeleteAndEnable;
