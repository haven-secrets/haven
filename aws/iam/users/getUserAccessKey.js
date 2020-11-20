import { iam } from "../../services.js";

const getUserAccessKey = (username) => {
  const params = {
    UserName: username,
  };

  return iam
    .listAccessKeys(params)
    .promise()
    .then((data) => {
      return data.AccessKeyMetadata[0]?.AccessKeyId;
    });
};

export default getUserAccessKey;
