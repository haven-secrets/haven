require("dotenv").config();
const AWS = require("aws-sdk");
const region = process.env["REGIONs"];
const dynamodb = new AWS.DynamoDB({ region });
const tableName = "DevSecrets";
const options = { region };
const secretName = "BigJoke";
const version = "1";

const kms = new AWS.KMS(options);

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
  // an error occurred
  else {
    console.log(data);
    const params = {
      CiphertextBlob: data.Item.SecretValue.B,
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
  }
});
