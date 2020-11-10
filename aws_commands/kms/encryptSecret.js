import AWS from "aws-sdk";
import dotenv from 'dotenv';
dotenv.config();

const keyId = process.env["KEYID"];
const region = process.env["REGION"];
const kms = new AWS.KMS({ region });

const encryptSecret = (secret, callback) => {
  const params = {
    KeyId: keyId,
    Plaintext: secret,
  };

  kms.encrypt(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else callback(data.CiphertextBlob);
  });
}

export default encryptSecret;