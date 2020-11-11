import { dynamodb } from "../services.js";

const putItem = (secretName, secretValue, version, tableName, encryptItem) => {
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

  encryptItem(secretValue, encryptCallback);
};

export default putItem;