"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Backup = void 0;
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
class Backup {
    constructor(_command, _args, _envVars) {
        this.command = _command;
        this.args = _args;
        this.envVars = _envVars;
    }
    run() {
        return new Promise((resolve, reject) => {
            const child = (0, child_process_1.spawn)(this.command, this.args, {
                shell: false, // Necessary for Windows / PATH resolution
                env: this.envVars,
            });
            child.stdout.on("data", (data) => console.log(`stdout: ${data}`));
            child.stderr.on("data", (data) => console.log(`stderr: ${data}`));
            child.on("close", (code) => {
                if (code == 0) {
                    resolve();
                }
                else {
                    reject(new Error(`Backup failed with exit code ${code}`));
                }
            });
        });
    }
    runAndWriteToFile(outputLocation) {
        return new Promise((resolve, reject) => {
            const output = fs_1.default.createWriteStream(outputLocation);
            const child = (0, child_process_1.spawn)(this.command, this.args, {
                shell: false, // Necessary for Windows / PATH resolution
                env: this.envVars,
            });
            child.stdout.pipe(output);
            child.stdout.on("data", (data) => console.log(`stdout: ${data}`));
            child.stderr.on("data", (data) => console.log(`stderr: ${data}`));
            child.on("close", (code) => {
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
