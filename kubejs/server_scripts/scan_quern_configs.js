// kubejs/startup_scripts/scan_quern_configs.js
// KubeJS 2001+ compatible: scans config & defaultconfigs for lines mentioning "quern"

console.info('[scan_quern_configs] Starting');

const File = Java.loadClass('java.io.File');
const Files = Java.loadClass('java.nio.file.Files');
const Paths = Java.loadClass('java.nio.file.Paths');
const StandardCharsets = Java.loadClass('java.nio.charset.StandardCharsets');

const roots = [
  new File('config'),
  new File('defaultconfigs')
];

const exts = ['.toml', '.cfg', '.json', '.properties', '.ini'];
const needles = [/quern/i]; // add more terms if you want

function hasWantedExt(name) {
  const lower = String(name).toLowerCase();
  return exts.some(e => lower.endsWith(e));
}

function scanFile(file) {
  try {
    const path = file.toPath();
    const lines = Files.readAllLines(path, StandardCharsets.UTF_8); // java.util.List<String>
    let hits = 0;

    for (let i = 0; i < lines.size(); i++) {
      const line = String(lines.get(i));
      if (needles.some(rx => rx.test(line))) {
        hits++;
        const prev = i > 0 ? String(lines.get(i - 1)).trim() : '';
        const next = i + 1 < lines.size() ? String(lines.get(i + 1)).trim() : '';
        console.info(`[scan_quern_configs] ${file.getPath()}:${i + 1}`);
        if (prev) console.info(`  ├─ prev: ${prev}`);
        console.info(`  ├─ line: ${line.trim()}`);
        if (next) console.info(`  └─ next: ${next}`);
      }
    }
    if (hits > 0) console.info(`[scan_quern_configs] ${hits} hit(s) in ${file.getPath()}`);
  } catch (e) {
    // ignore unreadable files
  }
}

function walk(dir) {
  if (!dir.exists()) return;
  // dir.listFiles() returns a Java array -> convert with Java.from(...)
  for (const f of Java.from(dir.listFiles())) {
    if (f.isDirectory()) walk(f);
    else if (hasWantedExt(f.getName())) scanFile(f);
  }
}

roots.forEach(walk);
console.info('[scan_quern_configs] Done');
