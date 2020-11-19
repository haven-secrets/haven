const AWS = require('aws-sdk');
const IAM = new AWS.IAM();
// const teardownUser = require('teardownUser.js');
// make sure teardownUser just does module.exports = teardownUser;

const MILLISECONDS_PER_HOUR = 1000 * 60 * 60;

exports.handler = async (event) => {
    const user = await IAM.getUser({ UserName: event.temporaryUsername }).promise();
    const { CreateDate: createDate, Tags: tags } = user.User;
    const permanentUsername = tags[0].Value;
    
    // const accessKeys = await IAM.createAccessKey({ UserName: permanentUsername }).promise();
    // const { AccessKeyId, SecretAccessKey } = accessKeys.AccessKey;

    const millisecondsSinceCreateDate = Date.now() - new Date(createDate);

    let response;
    if (millisecondsSinceCreateDate > MILLISECONDS_PER_HOUR) {
        // TODO: delete both users
        response = {
            statusCode: 403
        };
    } else {
        // TODO: delete temp user
        response = {
            statusCode: 200,
            body: 'successful test'
            // body: JSON.stringify({ AccessKeyId, SecretAccessKey })
        }
    }

    // console.log('response: ', response);
    return response;
};
