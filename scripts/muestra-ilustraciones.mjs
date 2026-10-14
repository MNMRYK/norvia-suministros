import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
const names = ['magnetotermico', 'valvula-esfera', 'rodamiento'];
const cards = names.map(n => `<div class="c"><div class="i">${readFileSync(`public/img/productos/${n}.svg`, 'utf8')}</div><p>${n}</p></div>`).join('');
const html = `<html><body style="margin:0;padding:40px;background:#fff;font:14px system-ui;display:flex;gap:24px">
<style>.c{width:320px;border:1px solid #E5E7EB;border-radius:12px;overflow:hidden}.i{background:#F5F7FA}.i svg{display:block;width:100%}p{margin:12px 16px;color:#4B5563}</style>${cards}</body></html>`;
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1088, height: 400 }, deviceScaleFactor: 2 });
await p.setContent(html); await p.screenshot({ path: process.argv[2], fullPage: true }); await b.close();
