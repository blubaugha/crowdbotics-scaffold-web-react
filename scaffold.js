const {prompt} = require('inquirer');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');
const settings = require('./settings');

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

async function execCommand(command, options) {
    try {
        const {stdout} = await exec(command, options);
        console.log(stdout);
    } catch (error) {
        console.error(error.message);
    }
}

async function main() {
    let project = createProject();

    await execCommand(`npx ${settings.starterKits.createReactApp} ${project.name}`);
    await execCommand(`npm run build`, {cwd: project.path});
    await execCommand(`git init`, {cwd: project.path});
    await execCommand(`heroku create ${project.name} --buildpack ${settings.buildPacks.createReactApp}`, {cwd: project.path});
    await execCommand(`git add .`, {cwd: project.path});
    await execCommand(`git commit -m "${settings.git.initialCommitMessage}"`, {cwd: project.path});
    await execCommand(`git push heroku master`, {cwd: project.path});
}

main().then((err) => err ? console.error(err) : null);