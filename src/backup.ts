import { spawn } from "child_process";
export class Backup {
  private command: string;
  private args: string[];
  private envVars: NodeJS.ProcessEnv;
  constructor(_command: string, _args: string[], _envVars: NodeJS.ProcessEnv) {
    this.command = _command;
    this.args = _args;
    this.envVars = _envVars;
  }
  run(): Promise<void> {
    return new Promise((resolve, reject) => {
      const process = spawn(this.command, this.args, {
        shell: false, // Necessary for Windows / PATH resolution
        env: this.envVars,
      });

      process.stdout.on("data", (data) => console.log(`stdout: ${data}`));
      process.stderr.on("data", (data) => console.log(`stderr: ${data}`));
      process.on("close", (code) => {
        if (code == 0) {
          resolve();
        } else {
          reject(new Error(`Backup failed with exit code ${code}`));
        }
      });
    });
  }
}
