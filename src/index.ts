import { config } from "dotenv";
import path from "path";
import { argv } from "node:process";
import { Database } from "./database";
config({ path: path.resolve(__dirname, "../.env") });
const init = async() => {
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
    const res=await databaseObj.Backup();
    console.log(`Successfully created backup file at ${res}`);
  } catch (err) {
    console.error(err);
  }
};
init();
