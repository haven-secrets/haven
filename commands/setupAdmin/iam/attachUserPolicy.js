const attachUserPolicy = (AWS, accountNumber) => {
  const iam = new AWS.IAM();
  var params = {
    PolicyArn: `arn:aws:iam::${accountNumber}:policy/LockitSecrets/LockitAdmin`,
    UserName: "LockitAdmin",
  };

  return iam.attachUserPolicy(params).promise();
};

export default attachUserPolicy;
