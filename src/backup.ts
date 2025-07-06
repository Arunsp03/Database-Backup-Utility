import { config, configDotenv } from "dotenv";
import { spawn } from "child_process";
import path from "path";
config({ path: path.resolve(__dirname, "../.env") });
export class Backup {
  private command: string;
  private args: string[];
  private userName: string;
  private dbType: string;
  constructor(
    _command: string,
    _args: string[],
    _userName: string,
    _dbType: string
  ) {
    this.command = _command;
    this.args = _args;
    this.userName = _userName;
    this.dbType = _dbType;
  }
  Backup() {
    if (this.dbType == "postgres") {
      const dir = spawn(this.command, this.args, {
        shell: false, // Necessary for Windows / PATH resolution
        env: {
          ...process.env,
          PGPASSWORD: process.env.POSTGRESDBPASSWORD, // Replace with your actual DB password
        },
      });

      dir.stdout.on("data", (data) => console.log(`stdout: ${data}`));
      dir.stderr.on("data", (data) => console.log(`stderr: ${data}`));
      dir.on("close", (code) =>
        console.log(`child process exited with code ${code}`)
      );
    }
  }
}
