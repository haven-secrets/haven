const attachUserPolicy = (AWS, accountNumber) => {
  const iam = new AWS.IAM();
  var params = {
    PolicyArn: `arn:aws:iam::${accountNumber}:policy/HavenSecrets/HavenSecretsAdmin`,
    UserName: "HavenSecretsAdmin",
  };

  return iam.attachUserPolicy(params).promise();
};

export default attachUserPolicy;
