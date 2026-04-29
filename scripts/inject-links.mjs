#!/usr/bin/env node

/**
 * Inject internal blog links into article content.
 * Reads LINK_INJECTIONS map from scripts/internal-links.py, then
 * intelligently inserts links at natural paragraph breaks in article content.
 *
 * Usage: node scripts/inject-links.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ARTICLES_PATH = path.join(__dirname, '../app/blog/articles.ts');

// Parse LINK_INJECTIONS from Python file
function parseLinkMap() {
  const pythonFile = fs.readFileSync(path.join(__dirname, 'internal-links.py'), 'utf-8');
  const linkMap = {};
  const lines = pythonFile.split('\n');
  let currentSlug = null;

  for (const line of lines) {
    const slugMatch = line.match(/^\s*'([^']+)':\s*\[/);
    if (slugMatch) {
      currentSlug = slugMatch[1];
      linkMap[currentSlug] = [];
    } else if (currentSlug && line.includes("',")) {
      const linkMatch = line.match(/\('([^']+)',\s*'([^']+)'\)/);
      if (linkMatch) {
        linkMap[currentSlug].push({ slug: linkMatch[1], anchor: linkMatch[2] });
      }
    } else if (currentSlug && line.includes('],')) {
      currentSlug = null;
    }
  }
  return linkMap;
}

// Check if link already exists in content
function hasLink(content, targetSlug) {
  return content.includes(`/blog/${targetSlug}`);
}

// Find insertion points: after main sections, before "Bottom Line" or conclusion
function findInsertionPoint(content, linkIndex) {
  const sections = content.split('\n\n');
  let cumulative = 0;
  let insertAt = null;

  // Skip first section (intro), inject after 2-4 sections
  const targetSection = Math.min(2 + linkIndex, sections.length - 3);
  for (let i = 0; i <= targetSection; i++) {
    cumulative += sections[i].length + 2;
  }

  return cumulative;
}

// Inject links into article content
function injectLinks(content, targetLinks) {
  let result = content;
  let injected = 0;

  for (const { slug, anchor } of targetLinks) {
    // Skip if already linked
    if (hasLink(result, slug)) continue;

    // Find insertion point based on which link this is
    const insertAt = findInsertionPoint(result, injected);
    if (insertAt < 0 || insertAt > result.length) continue;

    // Find nearest paragraph boundary before insertAt
    let boundary = insertAt;
    while (boundary > 0 && result[boundary - 1] !== '\n') boundary--;

    // Insert markdown link at paragraph start
    const link = `[${anchor}](/blog/${slug})`;
    result = result.slice(0, boundary) + link + '. ' + result.slice(boundary);
    injected++;
    if (injected >= 3) break; // Max 3 links per article
  }

  return result;
}

// Main
const linkMap = parseLinkMap();
const articlesFile = fs.readFileSync(ARTICLES_PATH, 'utf-8');

// Simple regex-based update (not perfect, but safe for now)
let updatedFile = articlesFile;
let totalInjected = 0;

for (const [slug, targets] of Object.entries(linkMap)) {
  if (targets.length === 0) continue;

  const pattern = new RegExp(
    `(slug: '${slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}',\\s+[^}]*?content: `)
  );

  if (!pattern.test(updatedFile)) continue;

  // This is a simplified approach — for production, parse and rebuild the TS AST
  console.log(`✓ ${slug}: marked for ${targets.length} links (requires manual injection due to TS structure)`);
  totalInjected += targets.length;
}

console.log(`\n⚠️  Found ${Object.keys(linkMap).length} articles with ${totalInjected} link targets.`);
console.log('Due to articles.ts TS/JS structure complexity, use manual injection or rebuild with esbuild/swc.');
console.log('\nAlternatively, restructure articles.ts to use imported markdown files for dynamic injection.');
