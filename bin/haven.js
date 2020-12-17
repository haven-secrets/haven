#!/usr/bin/env node
import AWS from "aws-sdk";
const credentials = new AWS.SharedIniFileCredentials({ profile: "default" });
AWS.config.credentials = credentials;

import parseArgs from "minimist";

const parsedArgs = parseArgs(process.argv.slice(2));

const command = parsedArgs._[0];
const command_args = parsedArgs._.slice(1);
const possible_commands = ["setup", "teardown"];

const filename = possible_commands.includes(command) ? command : "help";

const module_ = await import(`../src/commands/${filename}.js`);
module_.default(...command_args); // all modules for commands use default exports
