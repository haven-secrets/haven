import { kms } from "../services.js";

const reenableKey = async (keyId) => {
  const params = {
    KeyId: keyId,
  };

  await kms.cancelKeyDeletion(params).promise();
  kms.enableKey(params).promise();
};

export default reenableKey;
