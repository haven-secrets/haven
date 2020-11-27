const getUniqueTableNamesFromGroupNames = (groupNames) => {
  return groupNames.map(groupName => groupName.endsWith("ReadGroup") ? groupName.slice(0, -9) : groupName.slice(0, -10))
                   .filter((tableName, index, self) => self.indexOf(tableName) === index);
};

export default getUniqueTableNamesFromGroupNames;
