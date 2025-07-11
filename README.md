# 📦 Database Backup Utility

A simple CLI utility built in Node.js to automate backups of PostgreSQL and MySQL databases with support for `.env` configuration, timestamped filenames, and error logging.

---

## ✅ Features

- Supports **PostgreSQL** and **MySQL**
- Saves backups as `.sql` files
- Timestamped backup filenames (`DDMMYY_HHMMSS`)
- Uses native `spawn` for safe execution
- Auto-creates backup folders if missing
- Cleanly separates logic (Database, Backup, CLI)
- Written in **TypeScript**

---

# General Syntax
node dist/index.js <DatabaseType> <DatabaseName>

# Example (PostgreSQL)
node dist/index.js postgres mydatabase

# Example (MySQL)
node dist/index.js mysql mydatabase

Project Url : https://roadmap.sh/projects/database-backup-utility
