import { iam } from "../../services.js";

const createUser = username => {
  const params = {
    UserName: username,
  };

  return iam.createUser(params).promise();
};

export default createUser;