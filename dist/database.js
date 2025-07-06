"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
const backup_1 = require("./backup");
const utils_1 = require("./utils");
(0, dotenv_1.config)({ path: path_1.default.resolve(__dirname, "../.env") });
class Database {
    constructor(_dbType, _dbName) {
        this.extension = ".sql";
        this.dbName = _dbName;
        this.dbType = _dbType;
    }
    Backup() {
        const timeStamp = (0, utils_1.getFormattedDate)();
        if (this.dbType.toLowerCase() == "postgres") {
            const destination = process.env.POSTGRESDBBACKUPSTOREDESTINATION;
            const backupCommand = process.env.POSTGRESDBBACKUPCOMMAND;
            const dbName = this.dbName;
            const dbUserName = process.env.POSTGRESDBUSER;
            const args = ['-U', dbUserName, '-d', dbName, '-f', destination + '/' + dbName + "-" + timeStamp + this.extension];
            this.backupObj = new backup_1.Backup(backupCommand, args, dbUserName, this.dbType);
            this.backupObj.Backup();
        }
    }
}
exports.Database = Database;
