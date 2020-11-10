import { iam } from "../../services.js";

const userName = "testuser";

const params = {
  UserName: userName,
};

iam.createAccessKey(params, function(err, data) {
  if (err) console.log(err, err.stack);
  else console.log(data);
});