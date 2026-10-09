const fs = require('fs');

// Копируем db/db.json в dist/db/
if (!fs.existsSync('./dist/db')) {
  fs.mkdirSync('./dist/db', { recursive: true });
}
fs.copyFileSync('./db/db.json', './dist/db/db.json');

console.log('DB file copied to dist/db/');
