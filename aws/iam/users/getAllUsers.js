import { iam } from "../../services.js";

const getAllUsers = (path) => {
  const params = {
    PathPrefix: `/${path}/`,
  };

  return iam.listUsers(params).promise();
};

export default getAllUsers;
