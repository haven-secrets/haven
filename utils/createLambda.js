import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const region = process.env["REGION"];
const accountNumber = process.env["ACCOUNT_NUMBER"];
const keyId = process.env["KEYID"];

const path = "HavenSecrets"; // TODO: load this from a config file

const lambdaCodeFile = "aws/lambda/lambdaCode.js";
const lambdaCode = fs.readFileSync(lambdaCodeFile);

const leftPadNewLines = (text, numSpaces=12) => {
  const twelveSpaces = " ".repeat(12);
  return text.split("\n").join("\n" + twelveSpaces);
}

const createLambda = (params) => {
  const { lambdaName, groupName, roleName, lambdaPermisionsPolicyName, 
          invokePolicyName, lambdaCodeFile } = params;

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
    ${groupName}:
      Type: AWS::IAM::Group
      Properties:
        GroupName: ${groupName}
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

  // FOR TESTING
  // fs.writeFile("utils/createLambdaAndGroup.yml", template, (err) => {
  //   if (err) console.log(err);
  //   else console.log("Files created.");
  // });

  return template;
};

export default createLambda;
