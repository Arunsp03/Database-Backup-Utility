"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const backup_1 = require("./backup");
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
class Database {
    constructor(_dbType, _dbName) {
        this.extension = ".sql";
        this.dbName = _dbName;
        this.dbType = _dbType;
    }
    Backup() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let saveLocation = '';
                const timeStamp = (0, utils_1.getFormattedDate)();
                if (this.dbType.toLowerCase() == "postgres") {
                    const destination = process.env.POSTGRESDBBACKUPSTOREDESTINATION;
                    const backupCommand = process.env.POSTGRESDBBACKUPCOMMAND;
                    const dbName = this.dbName;
                    const dbUserName = process.env.POSTGRESDBUSER;
                    const backupSaveLocation = path_1.default.join(destination, `${dbName}-${timeStamp}${this.extension}`);
                    const args = ['-U', dbUserName, '-d', dbName, '-f', backupSaveLocation];
                    const env = Object.assign(Object.assign({}, process.env), { PGPASSWORD: process.env.POSTGRESDBPASSWORD });
                    this.backupObj = new backup_1.Backup(backupCommand, args, env);
                    yield this.backupObj.run();
                    saveLocation = backupSaveLocation;
                }
                return saveLocation;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.Database = Database;
