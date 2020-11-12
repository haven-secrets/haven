// TODO: don't hardcode stuff

import { iam } from "../../services.js";

const createUser = () => {
	const userName = "testuser";

	const params = {
	  UserName: userName,
	};

	iam.createUser(params, function(err, data) {
	  if (err) console.log(err, err.stack);
	  else console.log(data);
	});
};

export default createUser;