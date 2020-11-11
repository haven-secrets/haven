import { dynamodb } from "../services.js";

const getSecret = (secretName, version, tableName, decryptSecret) => {
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
};

export default getSecret;