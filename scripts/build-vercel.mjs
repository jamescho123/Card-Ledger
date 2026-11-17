import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'outputs');
const destination = path.join(root, 'dist');
const privateFiles = new Set(['sports-card-import.json', 'hci-selection-catalog.js', 'wembanyama-mosaic-gallery.html']);

function allowed(file) {
  const name = path.basename(file);
  return !privateFiles.has(name) && !name.startsWith('.') && !name.endsWith('-check.png')
    && !/\.(?:sqlite3?|db|zip|gz|zst|parquet|log)(?:-|$)/i.test(name);
}

await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });
await cp(source, destination, { recursive: true, filter: allowed });

// Keep the private, generated HCI selection data on the operator's computer.
const indexPath = path.join(destination, 'index.html');
const index = await readFile(indexPath, 'utf8');
const privateScript = /<script src="\.\/hci-selection-catalog\.js[^"\n]*"><\/script>/g;
if ([...index.matchAll(privateScript)].length !== 1) throw new Error('Expected one private catalog script reference');
await writeFile(indexPath, index.replace(privateScript, '<script>window.HCI_SELECTION_CATALOG = {};</script>'));

const workerPath = path.join(destination, 'service-worker.js');
const worker = await readFile(workerPath, 'utf8');
await writeFile(workerPath, worker.replace(/  "\.\/hci-selection-catalog\.js",\r?\n/, '')
  .replace(/const CACHE_NAME = "([^"]+)";/, 'const CACHE_NAME = "$1-cloud-20261118";'));

async function inspect(directory) {
  let count = 0, bytes = 0;
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (!allowed(file)) throw new Error(`Private artifact in deployment: ${entry.name}`);
    if (entry.isDirectory()) {
      const child = await inspect(file); count += child.count; bytes += child.bytes;
    } else {
      count++; bytes += (await stat(file)).size;
    }
  }
  return { count, bytes };
}
const result = await inspect(destination);
console.log(`Built ${result.count} public website files (${(result.bytes / 1048576).toFixed(1)} MiB). Private HCI data and personal imports excluded.`);
