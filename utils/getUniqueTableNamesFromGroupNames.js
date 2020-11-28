//TODO: REFACTOR
const getUniqueTableNamesFromGroupNames = (groupNames) => {
  return groupNames.reduce((tableNames, groupName) => {
                      if (groupName.endsWith("ReadGroup")) {
                        tableNames.push(groupName.slice(0, -9));
                      } else if (groupName.endsWith("WriteGroup")) {
                        tableNames.push(groupName.slice(0, -10));
                      }

                      return tableNames;
                    }, [])
                   .filter((tableName, index, self) => self.indexOf(tableName) === index);
};

export default getUniqueTableNamesFromGroupNames;
