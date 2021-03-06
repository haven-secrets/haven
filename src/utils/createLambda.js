import fs from "fs";
import fetchHavenAccountInfo from "./fetchHavenAccountInfo.js";
import path from 'path';

const leftPadNewLines = (text, numSpaces = 12) => {
  const twelveSpaces = " ".repeat(12);
  return text.split("\n").join("\n" + twelveSpaces);
};

var lambdaPath = path.join('..','aws', 'lambda', 'lambdaCode.js');
const lambdaCode = fs.readFileSync(new URL(lambdaPath, import.meta.url));

const createLambda = (params) => {

  const { region, accountNumber } = fetchHavenAccountInfo();
  const { lambdaName, temporaryGroupName, roleName, lambdaPermisionsPolicyName,
          invokePolicyName, lambdaCodeFile, path } = params;

  let lambdaCodeText = lambdaCode.toString();
  lambdaCodeText = leftPadNewLines(lambdaCodeText);

  const template = `---
  Resources:
    ${lambdaName}:
      Type: AWS::Lambda::Function
      Properties:
        FunctionName: ${lambdaName}
        Runtime: nodejs12.x
        Role: arn:aws:iam::${accountNumber}:role/${roleName}
        Description: Lambda to fetch permanent credentials for new, temporary users.
        Handler: index.handler
        Code:
          ZipFile: | ${lambdaCodeText}
    ${temporaryGroupName}:
      Type: AWS::IAM::Group
      Properties:
        GroupName: ${temporaryGroupName}
        Path: /${path}/
        Policies:
          - PolicyName: ${invokePolicyName}
            PolicyDocument:
              Version: 2012-10-17
              Statement:
              - Effect: Allow
                Action: lambda:InvokeFunction
                Resource: arn:aws:lambda:${region}:${accountNumber}:function:${lambdaName}
    `;

  return template;
};

export default createLambda;
