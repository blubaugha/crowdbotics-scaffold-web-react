const util = require('util');
const exec = util.promisify(require('child_process').exec);

class Command {
    static async exec(commandText, options) {
        const {stdout} = await exec(commandText, options);
        console.log(stdout);
    }
}

module.exports = Command;