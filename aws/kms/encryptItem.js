import { kms } from "../services.js";
const keyId = process.env["KEYID"];

const encryptItem = async (secret, callback) => {
  const params = {
    KeyId: keyId,
    Plaintext: secret,
  };

  return kms.encrypt(params).promise();
};

export default encryptItem;