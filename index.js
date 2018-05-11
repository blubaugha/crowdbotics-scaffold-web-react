const Scaffolder = require('./scaffolder');
const UserInput = require('./user-input');

async function main() {
    let project = await UserInput.createProject();
    let scaffolder = new Scaffolder(project);

    console.log(`Generating project "${project.name}"...`);
    await scaffolder.generateProject();
    console.log(`Finished generating project!`);

    while (await UserInput.confirmAddPackages()) {
        let packageName = await UserInput.addPackage();
        await scaffolder.addPackage(packageName);
    }

    console.log(`Building project "${project.name}"...`);
    await scaffolder.buildProject();
    console.log(`Finished building project!`);

    console.log(`Deploying to Heroku...`);
    await scaffolder.deployToHeroku();
    await scaffolder.openHerokuApp();
    console.log(`Finished deploying to Heroku!`);
}

main().then((err) => err ? console.error(err) : null);