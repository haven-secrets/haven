import { createHavenIam } from "../../services.js";

const deleteUser = (username) => {
  const params = {
    UserName: username,
  };

  return createHavenIam().deleteUser(params).promise();
};

export default deleteUser;
