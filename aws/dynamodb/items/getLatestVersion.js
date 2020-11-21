import getItem from "./getItem.js";

const getLatestVersion = async (secretName, tableName) => {
  try {
    const result = await getItem(secretName, "latest", tableName)
    return result.Item.VersionNumber.S;
  } catch (e) {
    // TODO: are we using console logs for the CLI? What about returns?
    if (e.message === "Requested resource not found") {
      console.log("Table does not exist");
      return "NO_TABLE";
    } else {
      console.log("Secret does not exist");
    }
  }
};

export default getLatestVersion;