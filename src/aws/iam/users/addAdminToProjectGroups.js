import addUserToGroup from "./addUserToGroup.js";
import { path, adminUserName } from "../../../utils/config.js";
import { createHavenIam } from "../../services.js";

const addAdminToProjectGroups = async (projectName) => {
  let groupNames = [];
  ['Dev', 'Prod', 'Stg' ].forEach((environment) => {
    ['Read', 'Write'].forEach((operation) => {
      groupNames.push(path+projectName+environment+operation+ "Group")
    })
  })
  const addUserToGroupPromises = groupNames.map((groupName) => addUserToGroup(groupName, adminUserName));
  return await Promise.all(addUserToGroupPromises)

};

export default addAdminToProjectGroups;
