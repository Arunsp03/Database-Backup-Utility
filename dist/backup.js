"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Backup = void 0;
const dotenv_1 = require("dotenv");
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
(0, dotenv_1.config)({ path: path_1.default.resolve(__dirname, "../.env") });
class Backup {
    constructor(_command, _args, _userName, _dbType) {
        this.command = _command;
        this.args = _args;
        this.userName = _userName;
        this.dbType = _dbType;
    }
    Backup() {
        if (this.dbType == "postgres") {
            const dir = (0, child_process_1.spawn)(this.command, this.args, {
                shell: false, // Necessary for Windows / PATH resolution
                env: Object.assign(Object.assign({}, process.env), { PGPASSWORD: process.env.POSTGRESDBPASSWORD }),
            });
            dir.stdout.on("data", (data) => console.log(`stdout: ${data}`));
            dir.stderr.on("data", (data) => console.log(`stderr: ${data}`));
            dir.on("close", (code) => console.log(`child process exited with code ${code}`));
        }
    }
}
exports.Backup = Backup;
