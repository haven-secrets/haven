import getAllItems from "../aws/dynamodb/getAllItems.js";

const logTableName = "LoggingTest"; // TODO: don't hardcode here

const parseLogData = (logs) => {
	// extract properties
	logs.forEach(logItem => {
		for (const logItemProperty in logItem) {
			logItem[logItemProperty] = logItem[logItemProperty].S;
		}
	});

	// reorder properties
	const propertiesInOrder = [
		'Project', 'Environment', 'EventType', 'DateTime', 
		'UserName', 'SecretName', 'Version', 'Response'
	];
	return logs.map(logItem => {
		let reorderedLogItem = {};

		propertiesInOrder.forEach(property => {
			reorderedLogItem[property] = logItem[property];
		});

		return reorderedLogItem;
	});
};

const sortLogs = (logs) => {
	logs.sort((item1, item2) => {
		return Date.parse(item2.DateTime) - Date.parse(item1.DateTime);
	});
};

const fetchLogs = async () => {
	let logs = await getAllItems(logTableName);
	logs = logs.Items;
	logs = parseLogData(logs);
	sortLogs(logs);

	logs.forEach((logItem) => {
		for (const logItemProperty in logItem) {
			console.log(`${logItemProperty}: ${logItem[logItemProperty]}`);
		}

		console.log('-'.repeat(80));
	});
};

export default fetchLogs;