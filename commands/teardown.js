import { iam } from "../aws/services.js";
import { kms } from "../aws/services.js";

const params = {
  MaxItems: "100",
  OnlyAttached: false, // temporary
  PathPrefix: "/Lockit/",
};

iam.listPolicies(params, function(err, data) {
  if (err) console.log(err, err.stack);
  else {
    data.Policies.map(policy => policy.Arn).forEach(arn => {
      iam.deletePolicy({ PolicyArn: arn }, function(err, data) {
        if (err) console.log(err, err.stack);
        else console.log(data);
      });
    })
  }
});

kms.listAliases({}, function(err, data) {
  if (err) console.log(err, err.stack);
  else {
    data.Aliases
        .filter(alias => /^alias\/Lockit.*/.test(alias.AliasName))
        .map(alias => alias.TargetKeyId)
        .forEach(id => {
          const params = {
            KeyId: id,
            PendingWindowInDays: '7', 
          }

          kms.scheduleKeyDeletion(params, function(err, data) {
            if (err) console.log(err, err.stack);
            else console.log(data);
          });
        });
  }
});