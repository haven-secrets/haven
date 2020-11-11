import { dynamodb } from "../services.js";
import decryptSecret from "../kms/decryptSecret.js";

const tableName = "DevSecrets";
const secretName = "NewSecret";
const version = "1";

const params = {
  Key: {
    SecretName: {
      S: secretName,
    },
    Version: {
      S: version,
    },
  },
  TableName: tableName,
};

dynamodb.getItem(params, function (err, data) {
  if (err) console.log(err, err.stack);
  else decryptSecret(data.Item.SecretValue.B);
});
