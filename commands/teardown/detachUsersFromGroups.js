import removeUserFromGroups from "../../aws/iam/users/removeUserFromGroups.js";

const detachUsersFromGroups = async (allUserData, projectName) => {
	const usernames = allUserData.Users.map(user => user.UserName);
	const detachmentPromises = usernames.flatMap(username => {
		return removeUserFromGroups(username, projectName);
	});
	return Promise.all(detachmentPromises);
};

export default detachUsersFromGroups;
