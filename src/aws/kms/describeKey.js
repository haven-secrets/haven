import { createHavenKms } from "../services.js";

const describeKey = async (keyId) => {
  const params = {
    KeyId: keyId,
  };

  return createHavenKms().describeKey(params).promise();
};

export default describeKey;
