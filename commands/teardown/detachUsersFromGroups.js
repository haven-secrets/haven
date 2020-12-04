import removeUserFromAllGroups from "../../aws/iam/users/removeUserFromAllGroups.js";
import {
  listGroupsForUserPolicyName,
  adminUserName,
} from "../../utils/config.js";
import deleteInlinePolicy from "../../aws/iam/policies/deleteInlinePolicy.js";

const detachUsersFromGroups = (allUserData, path, projectName) => {
  const usernames = allUserData.Users.map((user) => user.UserName);
  if (!projectName) {
    const deleteInlinePolicyPromises = usernames.flatMap((username) => {
      if (
        username === adminUserName ||
        /HavenSecretsTemporaryUser/.test(username)
      )
        return;
      deleteInlinePolicy(listGroupsForUserPolicyName, username);
    });
    Promise.all(deleteInlinePolicyPromises);
  }
  const detachmentPromises = usernames.flatMap((username) =>
    removeUserFromAllGroups(username, path, projectName)
  );
  return Promise.all(detachmentPromises);
};

export default detachUsersFromGroups;
