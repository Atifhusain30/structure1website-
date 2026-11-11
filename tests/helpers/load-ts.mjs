// Loads a TypeScript module from src/ for node:test, using the TypeScript compiler already in
// devDependencies (no extra test tooling). Relative imports ('./x') are transpiled too;
// modules under test must not use the '@/' alias or import packages that need a bundler.
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = path.join(tmpdir(), 's1-ts-tests', `${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2)}`);

function emit(abs, done) {
  if (done.has(abs)) return done.get(abs);
  const out = path.join(OUT, path.relative(ROOT, abs).replace(/[\\/]/g, '_').replace(/\.tsx?$/, '.mjs'));
  done.set(abs, out);
  const src = readFileSync(abs, 'utf8');
  let { outputText } = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
    fileName: abs,
  });
  outputText = outputText.replace(/(from\s+['"])(\.{1,2}\/[^'"]+)(['"])/g, (_, a, spec, b) => {
    const dep = path.resolve(path.dirname(abs), spec) + '.ts';
    return a + './' + path.basename(emit(dep, done)) + b;
  });
  writeFileSync(out, outputText);
  return out;
}

/** Fresh module instance on every call, so module-level state never leaks between tests. */
export async function loadTs(rel) {
  mkdirSync(OUT, { recursive: true });
  const stamp = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const file = emit(path.join(ROOT, rel), new Map());
  return import(`${pathToFileURL(file).href}?v=${stamp}`);
}
