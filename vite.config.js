import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const projectRoot = process.cwd();
const caseStudyDirectory = resolve(projectRoot, 'case-studies');
const caseStudyPages = readdirSync(caseStudyDirectory)
  .filter((file) => file.endsWith('.html'))
  .map((file) => file.replace(/\.html$/, ''));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(projectRoot, 'index.html'),
        ...Object.fromEntries(
          caseStudyPages.map((page) => [
            `case-studies/${page}`,
            resolve(caseStudyDirectory, `${page}.html`),
          ]),
        ),
      },
    },
  },
});
