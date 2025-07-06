import { config } from "dotenv";
import path from "path";
import { argv } from "node:process";
import { Database } from "./database";
import { checkDBTypeParams } from "./utils";
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
    if(!checkDBTypeParams(DatabaseType))
    {
      console.error(`Unsupported database type ${DatabaseType}.Only Postgres and Mysql are supported`);
      return;
    }
    const databaseObj = new Database(DatabaseType, DatabaseName);
    const res=await databaseObj.Backup();
    console.log(`Successfully created backup file at ${res}`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
init();
