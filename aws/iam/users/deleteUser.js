import { iam } from "../../services.js";

const deleteUser = username => {
  const params = {
    UserName: username,
  };

  return iam.deleteUser(params).promise();
};

export default deleteUser;