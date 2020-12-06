import { createHavenIam } from "../../services.js";

const listGroupsForUser = (username) => {
  const params = {
    UserName: username,
  };

  return createHavenIam().listGroupsForUser(params).promise();
};

export default listGroupsForUser;
