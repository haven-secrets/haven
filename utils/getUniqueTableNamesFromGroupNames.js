// const getUniqueTableNamesFromGroupNames = groupNames => {
//   return groupNames.map(groupName => groupName.endsWith("ReadGroup") ? groupName.slice(0, -9) : groupName.slice(0, -10))
//                    .filter((tableName, index, self) => self.indexOf(tableName) === index);
// };

//TODO: REFACTOR
const getUniqueTableNamesFromGroupNames = (groupNames) => {
  return groupNames
    .map((groupName) => {
      if (groupName.endsWith("ReadGroup")) {
        return groupName.slice(0, -9);
      } else if (groupName.endsWith("WriteGroup")) {
        return groupName.slice(0, -10);
      } else {
        return groupName;
      }
    })
    .filter((tableName, index, self) => self.indexOf(tableName) === index);
};
export default getUniqueTableNamesFromGroupNames;
