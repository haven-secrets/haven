/* DEPRECATED */

// // TODO: pass in region, accountNumber, tableName

// import { iam } from "../../services.js";
// import dotenv from "dotenv";
// dotenv.config();

// const createSecretWritePolicy = (tableName, policyName, keyId) => {
//   const region = process.env["REGION"];
//   const accountNumber = process.env["ACCOUNT_NUMBER"];

//   const policy = {
//     Version: "2012-10-17",
//     Statement: [
//       {
//         Effect: "Allow",
//         Action: "dynamodb:PutItem",
//         Resource: `arn:aws:dynamodb:${region}:${accountNumber}:table/${tableName}`,
//       },
//       {
//         Effect: "Allow",
//         Action: "kms:GenerateDataKey",
//         Resource: `arn:aws:kms:${region}:${accountNumber}:key/${keyId}`,
//       },
//       {
//         Effect: "Allow",
//         Action: "kms:ListAliases",
//         Resource: "*",
//       }
//     ],
//   };

//   const params = {
//     PolicyDocument: JSON.stringify(policy),
//     PolicyName: policyName,
//     Description: `Policy for writing to DynamoDB ${tableName}, listing key aliases, and generating data encryption keys`,
//     Path: "/Lockit/",
//   };

//   return iam.createPolicy(params).promise();
// };

// export default createSecretWritePolicy;