const settings = require('./settings');
const Command = require('./command');

class Scaffolder {
    constructor(project) {
        this.project = project;
    }

    async generateProject() {
        await Command.exec(`mkdir ${this.project.path}`);
        await Command.exec(
            `npx ${settings.starterKits.createReactApp.name} ${this.project.name}`,
            {cwd: settings.outputPath}
        );
    }

    async buildProject() {
        await Command.exec(`npm run build`, {cwd: this.project.path});
    }

    async addPackage(name) {
        await Command.exec(`npm install ${name} --save`, {cwd: this.project.path});
    }
}

module.exports = Scaffolder;