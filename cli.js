#!/usr/bin/env node
// TODO: tell minimist all arguments are strings
// (so it doesn't interpret them as numbers)
import AWS from "aws-sdk";
const credentials = new AWS.SharedIniFileCredentials({ profile: "default" });
AWS.config.credentials = credentials;

import parseArgs from "minimist";

const parsedArgs = parseArgs(process.argv.slice(2));

const command = parsedArgs._[0];
const command_args = parsedArgs._.slice(1);
const possible_commands = [
  "setup",
  "teardown",
  "getSecret",
  "getAllSecrets",
  "putSecret",
  "addUser",
  "getAllHavenUsers",
  "createProject",
  "createProjectCF",
  "deleteProjectCF",
  "setupUser",
  "run",
  "fetchLogs",
  "setupWithAdmin",
  "addUserToGroups",
  "revokeUserFromGroups",
  "revokeUser",
  "getFlaggedSecrets"
];

const filename = possible_commands.includes(command) ? command : "help";

const module_ = await import(`./commands/${filename}.js`);
module_.default(...command_args); // all modules for commands use default exports
