import { kms } from "../services.js";

const reenableKey = async keyId => {
  const params = {
    KeyId: keyId,
  };

  await kms.cancelKeyDeletion(params).promise();
  kms.enableKey(params).promise();
};
// reenableKey("0d41af3d-f0e7-4399-b8b3-9173e8e187fa")
export default reenableKey;
