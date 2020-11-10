import { iam } from "../../services.js";

const generateDecryptSecretPolicy = (region, accountNumber, keyId) => {  
  const policy = {
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "VisualEditor0",
        Effect: "Allow",
        Action: "kms:Decrypt",
        Resource: `arn:aws:kms:${region}:${accountNumber}:key/${keyId}`,
      },
    ],
  };

  const params = {
    PolicyDocument: JSON.stringify(policy),
    PolicyName: "LockitDevKMSDecrypt",
    Description: "Policy for decrypting values using CMK",
  };

  iam.createPolicy(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
}

export default generateDecryptSecretPolicy;