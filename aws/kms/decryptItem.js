import { kms } from "../services.js";

const decryptItem = async secret => {
  const params = {
    CiphertextBlob: secret,
  };

  const decrypted = await kms.decrypt(params).promise();
  return decrypted;
}

export default decryptItem;
