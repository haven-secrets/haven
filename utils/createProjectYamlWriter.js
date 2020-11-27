import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const region = process.env["REGION"];
const accountNumber = process.env["ACCOUNT_NUMBER"];
const keyId = process.env["KEYID"];

const createProjectTemplate = (projectName) => {
  const template = `---
  Resources:
    HavenSecrets${projectName}DevReadGroup:
      Type: AWS::IAM::Group
      Properties:
        GroupName: HavenSecrets${projectName}DevReadGroup
        Path: /HavenSecrets/
        Policies:
          - PolicyName: HavenSecrets${projectName}DevReadPolicy
            PolicyDocument:
              Version: 2012-10-17
              Statement:
                - Effect: Allow
                  Action:
                    - dynamodb:Scan
                    - dynamodb:GetItem
                  Resource: arn:aws:dynamodb:${region}:${accountNumber}:table/HavenSecrets${projectName}Dev
                - Effect: Allow
                  Action: kms:Decrypt
                  Resource: arn:aws:kms:${region}:${accountNumber}:key/${keyId}
    HavenSecrets${projectName}DevWriteGroup:
      Type: AWS::IAM::Group
      Properties:
        GroupName: HavenSecrets${projectName}DevWriteGroup
        Path: /HavenSecrets/
        Policies:
          - PolicyName: HavenSecrets${projectName}DevWritePolicy
            PolicyDocument:
              Version: 2012-10-17
              Statement:
                - Effect: Allow
                  Action:
                    - dynamodb:PutItem
                  Resource: arn:aws:dynamodb:${region}:${accountNumber}:table/HavenSecrets${projectName}Dev
                - Effect: Allow
                  Action:
                    - kms:Encrypt
                    - kms:GenerateDataKey
                  Resource: arn:aws:kms:${region}:${accountNumber}:key/${keyId}
    HavenSecrets${projectName}StgReadGroup:
      Type: AWS::IAM::Group
      Properties:
        GroupName: HavenSecrets${projectName}StgReadGroup
        Path: /HavenSecrets/
        Policies:
          - PolicyName: HavenSecrets${projectName}StgReadPolicy
            PolicyDocument:
              Version: 2012-10-17
              Statement:
                - Effect: Allow
                  Action:
                    - dynamodb:Scan
                    - dynamodb:GetItem
                  Resource: arn:aws:dynamodb:${region}:${accountNumber}:table/HavenSecrets${projectName}Stg
                - Effect: Allow
                  Action: kms:Decrypt
                  Resource: arn:aws:kms:${region}:${accountNumber}:key/${keyId}
    HavenSecrets${projectName}StgWriteGroup:
      Type: AWS::IAM::Group
      Properties:
        GroupName: HavenSecrets${projectName}StgWriteGroup
        Path: /HavenSecrets/
        Policies:
          - PolicyName: HavenSecrets${projectName}StgWritePolicy
            PolicyDocument:
              Version: 2012-10-17
              Statement:
                - Effect: Allow
                  Action:
                    - dynamodb:PutItem
                  Resource: arn:aws:dynamodb:${region}:${accountNumber}:table/HavenSecrets${projectName}Stg
                - Effect: Allow
                  Action:
                    - kms:Encrypt
                    - kms:GenerateDataKey
                  Resource: arn:aws:kms:${region}:${accountNumber}:key/${keyId}
    HavenSecrets${projectName}ProdReadGroup:
      Type: AWS::IAM::Group
      Properties:
        GroupName: HavenSecrets${projectName}ProdReadGroup
        Path: /HavenSecrets/
        Policies:
          - PolicyName: HavenSecrets${projectName}ProdReadPolicy
            PolicyDocument:
              Version: 2012-10-17
              Statement:
                - Effect: Allow
                  Action:
                    - dynamodb:Scan
                    - dynamodb:GetItem
                  Resource: arn:aws:dynamodb:${region}:${accountNumber}:table/HavenSecrets${projectName}Prod
                - Effect: Allow
                  Action: kms:Decrypt
                  Resource: arn:aws:kms:${region}:${accountNumber}:key/${keyId}
    HavenSecrets${projectName}ProdWriteGroup:
      Type: AWS::IAM::Group
      Properties:
        GroupName: HavenSecrets${projectName}ProdWriteGroup
        Path: /HavenSecrets/
        Policies:
          - PolicyName: HavenSecrets${projectName}ProdWritePolicy
            PolicyDocument:
              Version: 2012-10-17
              Statement:
                - Effect: Allow
                  Action:
                    - dynamodb:PutItem
                  Resource: arn:aws:dynamodb:${region}:${accountNumber}:table/HavenSecrets${projectName}Prod
                - Effect: Allow
                  Action:
                    - kms:Encrypt
                    - kms:GenerateDataKey
                  Resource: arn:aws:kms:${region}:${accountNumber}:key/${keyId}
    HavenSecrets${projectName}Dev:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: HavenSecrets${projectName}Dev
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
    HavenSecrets${projectName}Stg:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: HavenSecrets${projectName}Stg
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
    HavenSecrets${projectName}Prod:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: HavenSecrets${projectName}Prod
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
      console.log("We are creating your Haven files.\n" +
                  "This process should take 30-60 seconds.");
    }
  });
  return template;
};

export default createProjectTemplate;
