// TODO: don't hardcode groupName

import { iam } from "../../services.js";

const createGroup = (groupName) => {
  const params = {
    GroupName: groupName,
    Path: "/Lockit/",
  };

  iam.createGroup(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
};

export default createGroup;
