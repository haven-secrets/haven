import removeUserFromAllGroups from "../../aws/iam/users/removeUserFromAllGroups.js";

const detachUsersFromGroups = async (allUserData) => {
	const usernames = allUserData.Users.map((user) => user.UserName);
	const detachmentPromises = usernames.flatMap((username) => removeUserFromAllGroups(username));
	return Promise.all(detachmentPromises);
};

export default detachUsersFromGroups;
