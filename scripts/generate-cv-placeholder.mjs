/**
 * Generates a minimal, valid single-page PDF to stand in for the real CV, so the
 * Download CV button has something to deliver out of the box.
 *
 * Run with: node scripts/generate-cv-placeholder.mjs
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(here, '../public/Ivy_Mbengi_CV.pdf');

/* Violet theme palette as PDF "rg" operands (0-1 floats).
   The PDF page is white, so these are the darker roles:
   #1A1033 plum ink, #7C3AED violet, #B4689C a readable mid orchid. */
const PLUM_INK = '0.102 0.063 0.200';
const VIOLET = '0.486 0.227 0.929';
const MID_ORCHID = '0.706 0.408 0.612';

const LINES = [
  { text: 'Ivy Mbengi', size: 30, color: PLUM_INK, gap: 38 },
  { text: 'Cloud Engineer  |  Solutions Architect', size: 14, color: VIOLET, gap: 30 },
  { text: 'Nairobi, Kenya', size: 11, color: PLUM_INK, gap: 20 },
  { text: 'mbengiivy@gmail.com', size: 11, color: PLUM_INK, gap: 20 },
  {
    text: 'linkedin.com/in/ivy-mbengi  |  github.com/mbengiivy',
    size: 11,
    color: PLUM_INK,
    gap: 54,
  },
  { text: 'PLACEHOLDER DOCUMENT', size: 16, color: MID_ORCHID, gap: 26 },
  {
    text: 'Replace public/Ivy_Mbengi_CV.pdf with the real CV export.',
    size: 11,
    color: PLUM_INK,
    gap: 18,
  },
  {
    text: 'Keep the same file name so the Download CV button keeps working.',
    size: 11,
    color: PLUM_INK,
    gap: 0,
  },
];

/** Escapes the characters that are special inside a PDF literal string. */
const escapePdfText = (text) => text.replace(/([\\()])/g, '\\$1');

function buildContentStream() {
  const parts = ['BT', '1 0 0 1 64 740 Tm'];

  LINES.forEach((line, index) => {
    parts.push(`${line.color} rg`);
    parts.push(`/F1 ${line.size} Tf`);
    parts.push(`(${escapePdfText(line.text)}) Tj`);

    const gap = index === LINES.length - 1 ? 0 : -LINES[index].gap;
    if (gap !== 0) parts.push(`0 ${gap} Td`);
  });

  parts.push('ET');

  // Teal rule under the name block.
  parts.push(`${VIOLET} RG`, '1.5 w', '64 688 m', '531 688 l', 'S');

  return parts.join('\n');
}

const content = buildContentStream();

const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] ' +
    '/Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
  `<< /Length ${Buffer.byteLength(content, 'latin1')} >>\nstream\n${content}\nendstream`,
  '<< /Title (Ivy Mbengi - CV placeholder) /Author (Ivy Mbengi) /Producer (portfolio build script) >>',
];

let pdf = '%PDF-1.4\n';
const offsets = [];

objects.forEach((body, index) => {
  offsets.push(Buffer.byteLength(pdf, 'latin1'));
  pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
});

const xrefOffset = Buffer.byteLength(pdf, 'latin1');

pdf += `xref\n0 ${objects.length + 1}\n`;
pdf += '0000000000 65535 f \n';
offsets.forEach((offset) => {
  pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
});

pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Info ${objects.length} 0 R >>\n`;
pdf += `startxref\n${xrefOffset}\n%%EOF\n`;

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, Buffer.from(pdf, 'latin1'));

console.log(`Wrote ${outputPath} (${Buffer.byteLength(pdf, 'latin1')} bytes)`);
