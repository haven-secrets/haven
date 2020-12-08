import { createHavenIam } from "../../services.js";

const deleteUserAccessKey = (accessKeyId, username) => {
  const params = {
    AccessKeyId: accessKeyId,
    UserName: username,
  };

  return createHavenIam().deleteAccessKey(params).promise();
};

export default deleteUserAccessKey;
