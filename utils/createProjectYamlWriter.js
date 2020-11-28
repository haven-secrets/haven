import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const region = process.env["REGION"];
const accountNumber = process.env["ACCOUNT_NUMBER"];
const keyId = process.env["KEYID"];

const createProjectTemplate = (projectName) => {
  const template = `---
  Resources:
    Lockit${projectName}DevReadGroup:
      Type: AWS::IAM::Group
      Properties:
        GroupName: Lockit${projectName}DevReadGroup
        Path: /Lockit/
        Policies:
          - PolicyName: Lockit${projectName}DevReadPolicy
            PolicyDocument:
              Version: 2012-10-17
              Statement:
                - Effect: Allow
                  Action:
                    - dynamodb:Scan
                    - dynamodb:GetItem
                  Resource: arn:aws:dynamodb:${region}:${accountNumber}:table/Lockit${projectName}Dev
                - Effect: Allow
                  Action: kms:Decrypt
                  Resource: arn:aws:kms:${region}:${accountNumber}:key/${keyId}
    Lockit${projectName}DevWriteGroup:
      Type: AWS::IAM::Group
      Properties:
        GroupName: Lockit${projectName}DevWriteGroup
        Path: /Lockit/
        Policies:
          - PolicyName: Lockit${projectName}DevWritePolicy
            PolicyDocument:
              Version: 2012-10-17
              Statement:
                - Effect: Allow
                  Action:
                    - dynamodb:PutItem
                    - dynamodb:UpdateItem
                  Resource: arn:aws:dynamodb:${region}:${accountNumber}:table/Lockit${projectName}Dev
                - Effect: Allow
                  Action:
                    - kms:Encrypt
                    - kms:GenerateDataKey
                  Resource: arn:aws:kms:${region}:${accountNumber}:key/${keyId}
                - Effect: Allow
                  Action: kms:ListAliases
                  Resource: "*"
    Lockit${projectName}StgReadGroup:
      Type: AWS::IAM::Group
      Properties:
        GroupName: Lockit${projectName}StgReadGroup
        Path: /Lockit/
        Policies:
          - PolicyName: Lockit${projectName}StgReadPolicy
            PolicyDocument:
              Version: 2012-10-17
              Statement:
                - Effect: Allow
                  Action:
                    - dynamodb:Scan
                    - dynamodb:GetItem
                  Resource: arn:aws:dynamodb:${region}:${accountNumber}:table/Lockit${projectName}Stg
                - Effect: Allow
                  Action: kms:Decrypt
                  Resource: arn:aws:kms:${region}:${accountNumber}:key/${keyId}
    Lockit${projectName}StgWriteGroup:
      Type: AWS::IAM::Group
      Properties:
        GroupName: Lockit${projectName}StgWriteGroup
        Path: /Lockit/
        Policies:
          - PolicyName: Lockit${projectName}StgWritePolicy
            PolicyDocument:
              Version: 2012-10-17
              Statement:
                - Effect: Allow
                  Action:
                    - dynamodb:PutItem
                    - dynamodb:UpdateItem
                  Resource: arn:aws:dynamodb:${region}:${accountNumber}:table/Lockit${projectName}Stg
                - Effect: Allow
                  Action:
                    - kms:Encrypt
                    - kms:GenerateDataKey
                  Resource: arn:aws:kms:${region}:${accountNumber}:key/${keyId}
                - Effect: Allow
                  Action: kms:ListAliases
                  Resource: "*"
    Lockit${projectName}ProdReadGroup:
      Type: AWS::IAM::Group
      Properties:
        GroupName: Lockit${projectName}ProdReadGroup
        Path: /Lockit/
        Policies:
          - PolicyName: Lockit${projectName}ProdReadPolicy
            PolicyDocument:
              Version: 2012-10-17
              Statement:
                - Effect: Allow
                  Action:
                    - dynamodb:Scan
                    - dynamodb:GetItem
                  Resource: arn:aws:dynamodb:${region}:${accountNumber}:table/Lockit${projectName}Prod
                - Effect: Allow
                  Action: kms:Decrypt
                  Resource: arn:aws:kms:${region}:${accountNumber}:key/${keyId}
    Lockit${projectName}ProdWriteGroup:
      Type: AWS::IAM::Group
      Properties:
        GroupName: Lockit${projectName}ProdWriteGroup
        Path: /Lockit/
        Policies:
          - PolicyName: Lockit${projectName}ProdWritePolicy
            PolicyDocument:
              Version: 2012-10-17
              Statement:
                - Effect: Allow
                  Action:
                    - dynamodb:PutItem
                    - dynamodb:UpdateItem
                  Resource: arn:aws:dynamodb:${region}:${accountNumber}:table/Lockit${projectName}Prod
                - Effect: Allow
                  Action:
                    - kms:Encrypt
                    - kms:GenerateDataKey
                  Resource: arn:aws:kms:${region}:${accountNumber}:key/${keyId}
                - Effect: Allow
                  Action: kms:ListAliases
                  Resource: "*"
    Lockit${projectName}Dev:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: Lockit${projectName}Dev
        AttributeDefinitions:
        - AttributeName: SecretName
          AttributeType: S
        - AttributeName: Version
          AttributeType: S
        KeySchema:
        - AttributeName: SecretName
          KeyType: HASH
        - AttributeName: Version
          KeyType: RANGE
        ProvisionedThroughput:
          ReadCapacityUnits: 5
          WriteCapacityUnits: 5
    Lockit${projectName}Stg:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: Lockit${projectName}Stg
        AttributeDefinitions:
        - AttributeName: SecretName
          AttributeType: S
        - AttributeName: Version
          AttributeType: S
        KeySchema:
        - AttributeName: SecretName
          KeyType: HASH
        - AttributeName: Version
          KeyType: RANGE
        ProvisionedThroughput:
          ReadCapacityUnits: 5
          WriteCapacityUnits: 5
    Lockit${projectName}Prod:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: Lockit${projectName}Prod
        AttributeDefinitions:
        - AttributeName: SecretName
          AttributeType: S
        - AttributeName: Version
          AttributeType: S
        KeySchema:
        - AttributeName: SecretName
          KeyType: HASH
        - AttributeName: Version
          KeyType: RANGE
        ProvisionedThroughput:
          ReadCapacityUnits: 5
          WriteCapacityUnits: 5`;

  fs.writeFile("utils/createProjectCloudformation.yml", template, (err) => {
    if (err) console.log(err);
    else {
      console.log("We are creating your Lockit files.\n" +
                  "This process should take 30-60 seconds.");
    }
  });
  return template;
};

export default createProjectTemplate;
