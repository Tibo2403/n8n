import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const workflowDir = 'workflows';
const files = (await readdir(workflowDir)).filter((file) => file.endsWith('.json'));

if (files.length === 0) {
  throw new Error('No workflow JSON files found in workflows/.');
}

for (const file of files) {
  const path = join(workflowDir, file);
  const workflow = JSON.parse(await readFile(path, 'utf8'));

  if (!workflow.name || typeof workflow.name !== 'string') {
    throw new Error(`${path}: missing workflow name`);
  }

  if (!Array.isArray(workflow.nodes) || workflow.nodes.length === 0) {
    throw new Error(`${path}: workflow must contain at least one node`);
  }

  if (typeof workflow.connections !== 'object' || workflow.connections === null) {
    throw new Error(`${path}: missing connections object`);
  }
}

console.log(`Validated ${files.length} workflow export(s).`);
