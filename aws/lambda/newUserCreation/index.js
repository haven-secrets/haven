const AWS = require('aws-sdk');
const iam = new AWS.IAM();
const teardownUser = require('teardownUser.js');

const MILLISECONDS_PER_HOUR = 1000 * 60 * 60;

exports.handler = async (event) => {
  const temporaryUser = await iam.getUser({ UserName: event.temporaryUsername }).promise();
  const { CreateDate: createDate, Tags: tags } = temporaryUser.User;
  const permanentUsername = tags[0].Value;
  
  const millisecondsSinceCreateDate = Date.now() - new Date(createDate);

  let response;
  if (millisecondsSinceCreateDate > MILLISECONDS_PER_HOUR) {
    await teardownUser(event.temporaryUsername);
    await teardownUser(permanentUsername);

    response = {
        statusCode: 403
    };
  } else {
    const accessKeys = await iam.createAccessKey({ UserName: permanentUsername }).promise();
    const { AccessKeyId, SecretAccessKey } = accessKeys.AccessKey;

    await teardownUser(temporaryUser.User.UserName);

    response = {
        statusCode: 200,
        body: JSON.stringify({ AccessKeyId, SecretAccessKey })
    }
  }

  return response;
};