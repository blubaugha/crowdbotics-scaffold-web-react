const util = require('util');
const exec = util.promisify(require('child_process').exec);
const settings = require('./settings');

class Scaffolder {
    constructor(project) {
        this.project = project;
    }

    async generateProject() {
        await execCommand(`mkdir ${this.project.path}`);
        await execCommand(
            `npx ${settings.starterKits.createReactApp.name} ${this.project.name}`,
            {cwd: settings.outputPath}
        );
    }

    async buildProject() {
        await execCommand(`npm run build`, {cwd: this.project.path});
    }

    async addPackage(name) {
        await execCommand(`npm install ${name} --save`, {cwd: this.project.path});
    }

    async deployToHeroku() {
        await execCommand(`git init`, {cwd: this.project.path});
        await execCommand(
            `heroku create ${this.project.name} --buildpack ${settings.starterKits.createReactApp.buildPack}`,
            {cwd: this.project.path}
        );
        await execCommand(`heroku git:remote -a ${this.project.name}`, {cwd: this.project.path});
        await execCommand(`git add .`, {cwd: this.project.path});
        await execCommand(`git commit -m "${settings.git.initialCommitMessage}"`, {cwd: this.project.path});
        await execCommand(`git push heroku master`, {cwd: this.project.path});
    }

    async openHerokuApp() {
        await execCommand(`heroku open -a ${this.project.name}`, {cwd: this.project.path});
    }
}

async function execCommand(command, options) {
    try {
        const {stdout} = await exec(command, options);
        console.log(stdout);
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = Scaffolder;