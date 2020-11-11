import { kms } from "../services.js";

const decryptItem = async secret => {
  const params = {
    CiphertextBlob: secret,
  };

  return await kms.decrypt(params).promise();
}

export default decryptItem;
