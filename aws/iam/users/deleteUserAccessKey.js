import { iam } from "../../services.js";

const deleteUserAccessKey = (accessKeyId, username) => {
  const params = {
    AccessKeyId: accessKeyId,
    UserName: username,
  };

  return iam.deleteAccessKey(params).promise();
};

export default deleteUserAccessKey;
