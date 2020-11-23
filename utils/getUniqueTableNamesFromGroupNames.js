const getUniqueTableNamesFromGroupNames = groupNames => {
  return groupNames.map(groupName => groupName.endsWith("Read") ? groupName.slice(0, -4) : groupName.slice(0, -5))
                   .filter((tableName, index, self) => self.indexOf(tableName) === index);
};

export default getUniqueTableNamesFromGroupNames;