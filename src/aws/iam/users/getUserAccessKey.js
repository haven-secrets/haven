import { createHavenIam } from "../../services.js";

const getUserAccessKey = async (username) => {
  const params = {
    UserName: username,
  };

  const list = await createHavenIam().listAccessKeys(params).promise();
  return list.AccessKeyMetadata[0]?.AccessKeyId;
};

export default getUserAccessKey;
