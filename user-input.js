const {prompt} = require('inquirer');
const settings = require('./settings');
const path = require('path');

class UserInput {
    static async createProject() {
        const questions = [{
            type: 'input',
            name: 'projectName',
            message: 'Project Name:'
        }];

        const answers = await prompt(questions);

        return {
            name: answers.projectName,
            path: path.join(settings.outputPath, answers.projectName)
        };
    }

    static async confirmAddPackages() {
        const questions = [{
            type: 'confirm',
            name: 'shouldAddPackages',
            message: 'Add login?'
        }];

        const answers = await prompt(questions);
        return answers.shouldAddPackages;
    }

    static async addPackage() {
        const questions = [{
            type: 'list',
            name: 'packageName',
            message: 'Login with',
            choices: settings.packages.login
        }];

        const answers = await prompt(questions);
        return answers.packageName;
    }
}

module.exports = UserInput;