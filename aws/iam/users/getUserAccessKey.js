import { iam } from "../../services.js";

const getUserAccessKey = async username => {
  const params = {
    UserName: username,
  };

  const list = await iam.listAccessKeys(params).promise();
  return list.AccessKeyMetadata[0]?.AccessKeyId;
};

export default getUserAccessKey;