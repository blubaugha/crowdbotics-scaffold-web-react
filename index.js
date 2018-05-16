const Scaffolder = require('./scaffolder');
const HerokuDeployer = require('./heroku-deployer');
const UserInput = require('./user-input');

async function main() {
    const project = await UserInput.getProjectName();
    const scaffolder = new Scaffolder(project);
    const herokuDeployer = new HerokuDeployer(project);

    // Generate the project
    console.log(`Generating project "${project.name}"...`);
    await scaffolder.generateProject();
    console.log(`Finished generating project!`);

    // Add packages
    while (await UserInput.confirmAddPackages()) {
        const packageName = await UserInput.getPackageName();
        await scaffolder.addPackage(packageName);
    }

    // Build the project
    console.log(`Building project "${project.name}"...`);
    await scaffolder.buildProject();
    console.log(`Finished building project!`);

    // Deploy
    console.log(`Deploying to Heroku...`);
    await herokuDeployer.deploy();
    await herokuDeployer.openApp();
    console.log(`Finished deploying to Heroku!`);
}

main().then((err) => err ? console.error(err) : null);