import fs from 'node:fs';

import path from 'node:path';
import {fileURLToPath} from 'node:url';

export function readData() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, '..', '..', 'lab1', 'data', 'data.json');

  const dataJSON = fs.readFileSync(filePath, 'utf-8');
  const dataParsed = JSON.parse(dataJSON);
  return dataParsed;
}
