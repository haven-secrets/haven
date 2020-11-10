import AWS from "aws-sdk";
import dotenv from 'dotenv';
dotenv.config();

const region = process.env["REGION"];
const kms = new AWS.KMS({ region });
const description = "This is a test key";

const params = {
  Description: description,
};

kms.createKey(params, function (err, data) {
  if (err) console.log(err, err.stack);
  else {
    const keyAlias = "KeyAliasTest";
    const targetKeyId = data.KeyMetadata.KeyId;

    const params = {
      AliasName: `alias/${keyAlias}`,
      TargetKeyId: targetKeyId,
    };

    kms.createAlias(params, function (err, data) {
      if (err) console.log(err, err.stack);
      else console.log(data);
    });

    console.log(data);
    // Still need to load key id into .env
  }
});