import { kms } from "../services.js";
const keyId = process.env["KEYID"];

const encryptSecret = (secret, callback) => {
  const params = {
    KeyId: keyId,
    Plaintext: secret,
  };

  kms.encrypt(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else callback(data.CiphertextBlob);
  });
};

export default encryptSecret;
