import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const region = process.env["REGION"];
const accountNumber = process.env["ACCOUNT_NUMBER"];
const keyId = process.env["KEYID"];

const setupLogging = (groupName, policyName, tableName) => {
  const template = `---
  Resources:
    ${groupName}:
      Type: AWS::IAM::Group
      Properties:
        GroupName: ${groupName}
        Path: /Lockit/
        Policies:
          - PolicyName: ${policyName}
            PolicyDocument:
              Version: 2012-10-17
              Statement:
              - Effect: Allow
                Action: dynamodb:PutItem
                Resource: arn:aws:dynamodb:${region}:${accountNumber}:table/${tableName}
              - Effect: Allow
                Action: iam:GetUser
                Resource: "*"
    ${tableName}:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: ${tableName}
        AttributeDefinitions:
        - AttributeName: PK
          AttributeType: S
        KeySchema:
        - AttributeName: PK
          KeyType: HASH
        ProvisionedThroughput:
          ReadCapacityUnits: 5
          WriteCapacityUnits: 5`;

  fs.writeFile("utils/setupLogging.yml", template, (err) => {
    if (err) console.log(err);
    else {
      console.log("We are creating your Lockit files.\n" +
                  "This process should take 30-60 seconds.");
    }
  });
  return template;
};

export default setupLogging;
