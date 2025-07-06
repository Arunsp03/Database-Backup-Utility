"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Backup = void 0;
const child_process_1 = require("child_process");
class Backup {
    constructor(_command, _args, _envVars) {
        this.command = _command;
        this.args = _args;
        this.envVars = _envVars;
    }
    run() {
        return new Promise((resolve, reject) => {
            const process = (0, child_process_1.spawn)(this.command, this.args, {
                shell: false, // Necessary for Windows / PATH resolution
                env: this.envVars,
            });
            process.stdout.on("data", (data) => console.log(`stdout: ${data}`));
            process.stderr.on("data", (data) => console.log(`stderr: ${data}`));
            process.on("close", (code) => {
                if (code == 0) {
                    resolve();
                }
                else {
                    reject(new Error(`Backup failed with exit code ${code}`));
                }
            });
        });
    }
}
exports.Backup = Backup;
