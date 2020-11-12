import { iam } from "../../services.js";

const createUser = async username => {
  const params = {
    UserName: username,
  };

  return await iam.createUser(params).promise();
};

export default createUser;