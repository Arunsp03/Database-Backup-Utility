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
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
const node_process_1 = require("node:process");
const database_1 = require("./database");
(0, dotenv_1.config)({ path: path_1.default.resolve(__dirname, "../.env") });
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const DatabaseType = node_process_1.argv[2];
        const DatabaseName = node_process_1.argv[3];
        if (!DatabaseType || DatabaseType.trim() == "") {
            console.error("DatabaseType is Mandatory");
            return;
        }
        if (!DatabaseName || DatabaseName.trim() == "") {
            console.error("DatabaseType is Mandatory");
            return;
        }
        const databaseObj = new database_1.Database(DatabaseType, DatabaseName);
        const res = yield databaseObj.Backup();
        console.log(`Successfully created backup file at ${res}`);
    }
    catch (err) {
        console.error(err);
    }
});
init();
