import removeUserFromAllGroups from "../../aws/iam/users/removeUserFromAllGroups.js";

const detachUsersFromGroups = (allUserData, projectName) => {
	const usernames = allUserData.Users.map((user) => user.UserName);
	const detachmentPromises = usernames.flatMap((username) => removeUserFromAllGroups(username, projectName));
	return Promise.all(detachmentPromises);
};

export default detachUsersFromGroups;
