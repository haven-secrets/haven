import { kms } from "../services.js";

const decryptItem = secret => {
  const params = {
    CiphertextBlob: secret,
  };

  return kms.decrypt(params).promise();
}

export default decryptItem;
