import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import test from 'node:test';

const workflowDir = new URL('../workflows/', import.meta.url);
const files = (await readdir(workflowDir)).filter((file) => file.endsWith('.json'));
const workflows = await Promise.all(
  files.map(async (file) => ({
    file,
    raw: await readFile(new URL(file, workflowDir), 'utf8'),
  })),
);

const secretPatterns = [
  /sk-[A-Za-z0-9_-]{20,}/, // OpenAI-style keys
  /ghp_[A-Za-z0-9]{30,}/, // GitHub tokens
  /xox[abprs]-[A-Za-z0-9-]{10,}/, // Slack tokens
  /AKIA[0-9A-Z]{16}/, // AWS access keys
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /"(?:password|apiKey|api_key|accessToken|token|secret)"\s*:\s*"[^"={][^"]{5,}"/i,
];

test('at least one workflow export exists', () => {
  assert.ok(files.length > 0);
});

for (const { file, raw } of workflows) {
  const workflow = JSON.parse(raw);
  const nodes = workflow.nodes ?? [];

  test(`${file}: node ids and names are unique`, () => {
    const ids = nodes.map((node) => node.id);
    const names = nodes.map((node) => node.name);
    assert.equal(new Set(ids).size, ids.length, 'duplicate node id');
    assert.equal(new Set(names).size, names.length, 'duplicate node name');
  });

  test(`${file}: every node has a type and position`, () => {
    for (const node of nodes) {
      assert.match(node.type ?? '', /^[@\w-]+(\/[\w-]+)?\.[\w-]+$/, `bad type on ${node.name}`);
      assert.ok(Array.isArray(node.position) && node.position.length === 2, `bad position on ${node.name}`);
    }
  });

  test(`${file}: connections only reference existing nodes`, () => {
    const names = new Set(nodes.map((node) => node.name));
    for (const [source, outputs] of Object.entries(workflow.connections ?? {})) {
      assert.ok(names.has(source), `unknown source node "${source}"`);
      for (const branches of Object.values(outputs)) {
        for (const branch of branches) {
          for (const target of branch ?? []) {
            assert.ok(names.has(target.node), `unknown target node "${target.node}"`);
          }
        }
      }
    }
  });

  test(`${file}: has a trigger node`, () => {
    assert.ok(nodes.some((node) => /trigger|webhook/i.test(node.type)), 'no trigger node');
  });

  test(`${file}: contains no hardcoded secrets`, () => {
    for (const pattern of secretPatterns) {
      assert.doesNotMatch(raw, pattern);
    }
  });
}
