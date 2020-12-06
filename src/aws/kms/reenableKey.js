import { createHavenKms } from "../services.js";

const reenableKey = async (keyId) => {
  const params = {
    KeyId: keyId,
  };

  await createHavenKms().cancelKeyDeletion(params).promise();
  kms.enableKey(params).promise();
};

export default reenableKey;
