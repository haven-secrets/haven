import { kms } from "../services.js";

const createKey = description => {
  const params = {
    Description: description,
  };

  kms.createKey(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else {
      const keyAlias = "LockitKey3";
      const targetKeyId = data.KeyMetadata.KeyId;

      const params = {
        AliasName: `alias/${keyAlias}`,
        TargetKeyId: targetKeyId,
      };

      kms.createAlias(params, function (err, data) {
        if (err) console.log(err, err.stack);
        else console.log(`Your Lockit master key is called ${keyAlias}`);
      });

      console.log(data);
    }
  });
}

export default createKey;