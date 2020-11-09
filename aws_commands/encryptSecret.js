require("dotenv").config();
const AWS = require("aws-sdk");
const iam = new AWS.IAM();
const keyId = process.env["KEYID"];
const accountNumber = process.env["ACCOUNT_NUMBER"];
const region = process.env["REGION"];
const keyAlias = "KeyAliasTest";
const secretName = "FavoriteSuperMarket";
const secretValue = "KingSoopers";
const tableName = "DevSecrets";

const dynamodb = new AWS.DynamoDB({ region });

const options = { region };

const kms = new AWS.KMS(options);

const params = {
  KeyId: keyId, // The identifier of the CMK to use for encryption. You can use the key ID or Amazon Resource Name (ARN) of the CMK, or the name or ARN of an alias that refers to the CMK.
  Plaintext: secretValue,
};
kms.encrypt(params, function (err, data) {
  if (err) console.log(err, err.stack);
  // an error occurred
  else {
    console.log(data, "encrypted");

    const tableParams = {
      Item: {
        SecretName: {
          S: secretName,
        },
        SecretValue: {
          B: data.CiphertextBlob,
        },
        Version: {
          S: "1",
        },
      },
      ReturnConsumedCapacity: "TOTAL",
      TableName: tableName,
    };
    dynamodb.putItem(tableParams, function (err, data) {
      if (err) console.log(err, err.stack);
      // an error occurred
      else console.log(data); // successful response
    });

    const params = {
      CiphertextBlob: data.CiphertextBlob,
    };

    kms.decrypt(params, function (err, data) {
      if (err) console.log(err, err.stack);
      // an error occurred
      else {
        let buff = Buffer.from(data.Plaintext, "base64");
        let text = buff.toString("ascii");
        console.log(text, "decrypted"); // successful response
      }
    });
  } // successful response
});
