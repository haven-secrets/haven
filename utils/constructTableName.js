import capitalize from "./capitalize.js"

const constructTableName = (project, environment) => {
	return 'Lockit' + capitalize(project) + capitalize(environment);
}

export default constructTableName;
