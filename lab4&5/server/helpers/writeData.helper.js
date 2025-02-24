import fs from 'node:fs';

import path from 'node:path';
import {fileURLToPath} from 'node:url';

export function writeData(data) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, '..', '..', 'lab1', 'data', 'data.json');

  fs.writeFileSync(filePath, data);
}
