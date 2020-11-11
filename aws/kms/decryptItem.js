import { kms } from "../services.js";

const decryptItem = async secret => {
  const params = {
    CiphertextBlob: secret,
  };

  const decrypted = await kms.decrypt(params).promise();
  const buffer = Buffer.from(decrypted.Plaintext, "base64");
  return buffer.toString("ascii");
}

export default decryptItem;