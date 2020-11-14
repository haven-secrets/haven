import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const region = process.env["REGION"];
const accountNumber = process.env["ACCOUNT_NUMBER"];
const keyId = process.env["KEYID"];
const projectName = "testWithWriter";

const template = `---
Resources:
  LockitDevReadGroup${projectName}:
    Type: AWS::IAM::Group
    Properties:
      GroupName: LockitDevReadGroup${projectName}
      Path: /Lockit/
      Policies:
        - PolicyName: LockitDevReadPolicy${projectName}
          PolicyDocument:
            Version: 2012-10-17
            Statement:
              - Effect: Allow
                Action:
                  - dynamodb:Scan
                  - dynamodb:GetItem
                Resource: arn:aws:dynamodb:${region}:${accountNumber}:table/LockitDev${projectName}
              - Effect: Allow
                Action: kms:Decrypt
                Resource: arn:aws:kms:${region}:${accountNumber}:key/${keyId}
  LockitDevWriteGroup${projectName}:
    Type: AWS::IAM::Group
    Properties:
      GroupName: LockitDevWriteGroup${projectName}
      Path: /Lockit/
      Policies:
        - PolicyName: LockitDevWritePolicy${projectName}
          PolicyDocument:
            Version: 2012-10-17
            Statement:
              - Effect: Allow
                Action:
                  - dynamodb:PutItem
                Resource: arn:aws:dynamodb:${region}:${accountNumber}:table/LockitDev${projectName}
              - Effect: Allow
                Action:
                  - kms:Encrypt
                  - kms:GenerateDataKey
                Resource: arn:aws:kms:${region}:${accountNumber}:key/${keyId}
  LockitStgReadGroup${projectName}:
    Type: AWS::IAM::Group
    Properties:
      GroupName: LockitStgReadGroup${projectName}
      Path: /Lockit/
      Policies:
        - PolicyName: LockitStgReadPolicy${projectName}
          PolicyDocument:
            Version: 2012-10-17
            Statement:
              - Effect: Allow
                Action:
                  - dynamodb:Scan
                  - dynamodb:GetItem
                Resource: arn:aws:dynamodb:${region}:${accountNumber}:table/LockitStg${projectName}
              - Effect: Allow
                Action: kms:Decrypt
                Resource: arn:aws:kms:${region}:${accountNumber}:key/${keyId}
  LockitStgWriteGroup${projectName}:
    Type: AWS::IAM::Group
    Properties:
      GroupName: LockitStgWriteGroup${projectName}
      Path: /Lockit/
      Policies:
        - PolicyName: LockitStgWritePolicy${projectName}
          PolicyDocument:
            Version: 2012-10-17
            Statement:
              - Effect: Allow
                Action:
                  - dynamodb:PutItem
                Resource: arn:aws:dynamodb:${region}:${accountNumber}:table/LockitStg${projectName}
              - Effect: Allow
                Action:
                  - kms:Encrypt
                  - kms:GenerateDataKey
                Resource: arn:aws:kms:${region}:${accountNumber}:key/${keyId}
  LockitProdReadGroup${projectName}:
    Type: AWS::IAM::Group
    Properties:
      GroupName: LockitProdReadGroup${projectName}
      Path: /Lockit/
      Policies:
        - PolicyName: LockitProdReadPolicy${projectName}
          PolicyDocument:
            Version: 2012-10-17
            Statement:
              - Effect: Allow
                Action:
                  - dynamodb:Scan
                  - dynamodb:GetItem
                Resource: arn:aws:dynamodb:${region}:${accountNumber}:table/LockitProd${projectName}
              - Effect: Allow
                Action: kms:Decrypt
                Resource: arn:aws:kms:${region}:${accountNumber}:key/${keyId}
  LockitProdWriteGroup${projectName}:
    Type: AWS::IAM::Group
    Properties:
      GroupName: LockitProdWriteGroup${projectName}
      Path: /Lockit/
      Policies:
        - PolicyName: LockitProdWritePolicy${projectName}
          PolicyDocument:
            Version: 2012-10-17
            Statement:
              - Effect: Allow
                Action:
                  - dynamodb:PutItem
                Resource: arn:aws:dynamodb:${region}:${accountNumber}:table/LockitProd${projectName}
              - Effect: Allow
                Action:
                  - kms:Encrypt
                  - kms:GenerateDataKey
                Resource: arn:aws:kms:${region}:${accountNumber}:key/${keyId}
  LockitEnv${projectName}:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: LockitEnv${projectName}
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
  LockitStg${projectName}:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: LockitStg${projectName}
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
  LockitProd${projectName}:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: LockitProd${projectName}
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
  else console.log(template);
});
