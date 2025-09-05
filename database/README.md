# Database Folder

This folder contains the persistent SQLite database for the Tools App.

## Database File

- **`tools.db`** - The main SQLite database file that stores all your data

## How It Works

1. **First Run**: The app creates a new database in memory
2. **Auto-Save**: After any changes, the app automatically downloads the database file
3. **Persistence**: Place the downloaded `tools.db` file in this folder to persist data
4. **Next Run**: The app loads the existing database from this file

## Manual Database Management

### Export Database
1. Go to **Database** → **Backup & Restore**
2. Click **"Export Database"**
3. Save the downloaded file as `tools.db` in this folder

### Import Database
1. Go to **Database** → **Backup & Restore**
2. Click **"Choose File"** and select your `tools.db` file
3. Click **"Import Database"**

## Database Structure

The database contains these tables:
- **`tools_usage`** - Tracks which tools you use and when
- **`query_history`** - Stores your SQL query history
- **`user_data`** - Stores any custom data you create

## Backup Recommendations

- Export your database regularly
- Keep backups of the `tools.db` file
- The database file is portable - you can move it between installations

## Troubleshooting

- If the database doesn't load, delete `tools.db` and restart the app
- If you see errors, check the browser console (F12) for details
- Make sure the `tools.db` file is in the `database/` folder, not in a subfolder
