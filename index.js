const {prompt} = require('inquirer');
const path = require('path');
const settings = require('./settings');
const Scaffolder = require('./scaffolder');

let project;
let scaffolder;

async function main() {
    project = await createProject();
    scaffolder = new Scaffolder(project);

    console.log(`Building project "${project.name}"...`);
    await scaffolder.buildProject();
    console.log(`Finished building project!`);

    await addPackages();

    console.log(`Deploying to Heroku...`);
    await scaffolder.deployToHeroku();
    await scaffolder.openHerokuApp();
    console.log(`Finished deploying to Heroku!`);
}

async function createProject() {
    const questions = [{
        type: 'input',
        name: 'projectName',
        message: 'Project Name:'
    }];

    const answers = await prompt(questions);

    return {
        name: answers.projectName,
        path: path.join(__dirname, answers.projectName)
    };
}

async function confirmAddPackages() {
    const questions = [{
        type: 'confirm',
        name: 'shouldAddPackages',
        message: 'Add login?'
    }];

    const answers = await prompt(questions);
    return answers.shouldAddPackages;
}

async function addPackages() {
    while (await confirmAddPackages()) {
        const questions = [{
            type: 'list',
            name: 'packageName',
            message: 'Login with',
            choices: settings.packages.login
        }];

        const answers = await prompt(questions);
        await scaffolder.addPackage(answers.packageName);
    }
}

main().then((err) => err ? console.error(err) : null);