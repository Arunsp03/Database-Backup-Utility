"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_process_1 = require("node:process");
const database_1 = require("./database");
const init = () => {
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
        databaseObj.Backup();
        console.log("Successfully created backup file");
    }
    catch (err) {
        console.error(err);
    }
};
init();
