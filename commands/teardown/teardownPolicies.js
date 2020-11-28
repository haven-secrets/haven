/* DEPRECATED */

// import { iam } from "../../aws/services.js";

// const teardownPolicies = async () => {
//   const params = {
//     MaxItems: "100",
//     OnlyAttached: false, // temporary
//     PathPrefix: "/HavenSecrets/",
//   };

//   const list = await iam.listPolicies(params).promise();

//   return list.Policies.map((policy) => {
//     return iam.deletePolicy({ PolicyArn: policy.Arn }).promise()
//   });
// };

// export default teardownPolicies;
