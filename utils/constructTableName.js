const toUpperCase = str => str[0].toUpperCase() + str.substr(1);

const constructTableName = (project, environment) => {
	return 'Lockit' + project + toUpperCase(environment);
}

export default constructTableName;