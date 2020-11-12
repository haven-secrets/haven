import { kms } from "../services.js";

const describeKey = async (keyId) => {
  const params = {
    KeyId: keyId,
  };

  return kms.describeKey(params).promise();
};

export default describeKey;
