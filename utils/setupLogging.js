import fs from "fs";
import { region, accountNumber } from "../aws/services.js";
import getKeyId from "./getKeyIdFromAlias.js";
const keyId = await getKeyId();

const setupLogging = (groupName, policyName, tableName) => {
  const template = `---
  Resources:
    ${groupName}:
      Type: AWS::IAM::Group
      Properties:
        GroupName: ${groupName}
        Path: /HavenSecrets/
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

  return template;
};

export default setupLogging;
