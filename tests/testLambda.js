/*
 1. create a lambda
 2. invoke it
 3. add permission to create user
 4. research to find out how to give permission to create users WITH permissions?
 5. 
*/
import { lambda } from "../aws/services.js";
import { readFileSync } from "fs";

/* create function */
// const params = {
//   Code: {
//     ZipFile: readFileSync('lambdaZipFile.js.zip'),
//   },
//   FunctionName: 'lambdaTest98',
//   Handler: 'lambdaZipFile.handler',
//   Role: 'arn:aws:iam::678757113220:role/service-role/lambdaCredentialFetcher_Test1',
//   Runtime: "nodejs12.x", // do we need v12?
// };

// const result = await lambda.createFunction(params, function(err, data) {
//    if (err) console.log(err, err.stack); // an error occurred
//    else     console.log(data);
//  });

// console.log(result);

/* invoke function */
var params = {   
	FunctionName: "lambdaTest99",  
	// InvocationType: "RequestResponse",  
	// Payload: '{ "key": "value" }', 
};  

lambda.invoke(params, function (err, data) {   
	if (err) console.log(err, err.stack);   // an error occurred   
	else { // successful response 
		const parsedData = JSON.parse(data.Payload);
		console.log(parsedData); 
	}
}); 

