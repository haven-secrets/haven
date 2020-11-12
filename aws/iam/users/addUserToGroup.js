// TODO: don't hardcode stuff

import { iam } from "../../services.js";

const addUserToGroup = () => {
	const groupName = "testdevs";
	const userName = "testuser";

	const params = {
	  GroupName: groupName, 
	  UserName: userName,
	};

	iam.addUserToGroup(params, function(err, data) {
	  if (err) console.log(err, err.stack)
	  else console.log(data);
	});
};

export default addUserToGroup;