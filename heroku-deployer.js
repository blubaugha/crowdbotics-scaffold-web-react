const Command = require('./command');
const settings = require('./settings');

class HerokuDeployer {
    constructor(project) {
        this.project = project;
    }

    async deploy() {
        await Command.exec(`git init`, { cwd: this.project.path });
        await Command.exec(
            `heroku create ${this.project.name} --buildpack ${settings.starterKits.createReactApp.buildPack}`,
            { cwd: this.project.path }
        );
        await Command.exec(`heroku git:remote -a ${this.project.name}`, { cwd: this.project.path });
        await Command.exec(`git add .`, { cwd: this.project.path });
        await Command.exec(`git commit -m "${settings.git.initialCommitMessage}"`, { cwd: this.project.path });
        await Command.exec(`git push heroku master`, { cwd: this.project.path });
    }

    async openApp() {
        await Command.exec(`heroku open -a ${this.project.name}`, { cwd: this.project.path });
    }
}

module.exports = HerokuDeployer;