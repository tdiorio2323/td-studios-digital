import fs from "node:fs";
import p from "node:path";
const root = "src";
const exts = new Set([".tsx", ".ts", ".jsx", ".js"]);
const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const fp = p.join(d, f);
    const st = fs.statSync(fp);
    if (st.isDirectory()) walk(fp);
    else if (exts.has(p.extname(fp))) files.push(fp);
  }
})(root);
const rxs = [
  /<Route[^>]*\spath=["'`]([^"'`]+)["'`]/g,
  /path:\s*["'`]([^"'`]+)["'`]/g,
  /createFileRoute\(["'`]([^"'`]+)["'`]\)/g,
  /createRoute\(\s*{[^}]*path:\s*["'`]([^"'`]+)["'`]/gs,
];
const set = new Set();
for (const f of files) {
  const s = fs.readFileSync(f, "utf8");
  for (const rx of rxs) {
    let m;
    while ((m = rx.exec(s))) set.add(m[1]);
  }
}
console.log([...set].sort().join("\n"));
