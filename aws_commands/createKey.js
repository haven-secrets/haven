require("dotenv").config();
const AWS = require("aws-sdk");
const region = process.env["REGION"];
const accountNumber = process.env["ACCOUNT_NUMBER"];
const username = process.env["USERNAME"];
const description = "This is a test key";
const newKeyAlias = "KeyAliasTest"; // can't be empty, no spaces allowed
const options = { region };

const kms = new AWS.KMS(options);

const params = {
  Description: description, // can be empty
};

kms.createKey(params, function (err, data) {
  if (err) console.log(err, err.stack);
  // an error occurred
  else {
    const TargetKeyId = data.KeyMetadata.KeyId;
    const params = {
      AliasName: `alias/${newKeyAlias}`, // The alias to create. Aliases must begin with 'alias/'. Do not use aliases that begin with 'alias/aws' because they are reserved for use by AWS.
      TargetKeyId: TargetKeyId, // The identifier of the CMK whose alias you are creating. You can use the key ID or the Amazon Resource Name (ARN) of the CMK.
    };

    kms.createAlias(params, function (err, data) {
      if (err) console.log(err, err.stack);
      // an error occurred
      else console.log(data); // successful alias response
    });
    console.log(data); // successful key creation response
  }
});
