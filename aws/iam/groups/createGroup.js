import { iam } from "../../services.js";

const groupName = "testdevs";

const params = {
  GroupName: groupName,
};

iam.createGroup(params, function (err, data) {
  if (err) console.log(err, err.stack);
  else console.log(data);
});