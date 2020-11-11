import { dynamodb } from "../services.js";

const putSecret = (secretName, secretValue, version, tableName, encryptSecret) => {
  const encryptCallback = (encryptedSecret) => {
    const params = {
      Item: {
        SecretName: {
          S: secretName,
        },
        SecretValue: {
          B: encryptedSecret,
        },
        Version: {
          S: version,
        },
      },
      ReturnConsumedCapacity: "TOTAL",
      TableName: tableName,
    };

    dynamodb.putItem(params, function (err, data) {
      if (err) console.log(err, err.stack);
      else console.log(data);
    });
  };

  encryptSecret(secretValue, encryptCallback);
};

export default putSecret;
