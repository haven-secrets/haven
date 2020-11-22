import { iam } from "../../services.js";

const getAllUsers = () => {
  const params = {
    PathPrefix: "/Lockit/",
  };

  return iam.listUsers(params).promise();
};

export default getAllUsers;