// One-shot: replace "\`" (backslash-backtick) with "`" in articles-round2.ts.
// Edit tool inserted escaped backticks; this fixes them.
import fs from 'fs';
const path = 'app/blog/articles-round2.ts';
let txt = fs.readFileSync(path, 'utf8');
const before = txt.split('\\`').length - 1;
txt = txt.split('\\`').join('`');
fs.writeFileSync(path, txt);
console.log('Replaced', before, 'occurrences of \\` with `');
