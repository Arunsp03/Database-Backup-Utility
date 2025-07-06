import { argv } from "node:process";
import { Database } from "./database";
const init = () => {
  try {
    const DatabaseType = argv[2];
    const DatabaseName = argv[3];
    if (!DatabaseType || DatabaseType.trim() == "") {
      console.error("DatabaseType is Mandatory");
      return;
    }
    if (!DatabaseName || DatabaseName.trim() == "") {
      console.error("DatabaseType is Mandatory");
      return;
    }
    const databaseObj = new Database(DatabaseType, DatabaseName);
    databaseObj.Backup();
    console.log("Successfully created backup file");
  } catch (err) {
    console.error(err);
  }
};
init();
