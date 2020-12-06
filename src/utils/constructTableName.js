import capitalize from "./capitalize.js"

const constructTableName = (project, environment) => {
	return `HavenSecrets${capitalize(project)}${capitalize(environment)}`;
}

export default constructTableName;
