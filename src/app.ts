import PurgeCSS from '@fullhuman/postcss-purgecss';
import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import postcss from 'postcss';
import discardComments from 'postcss-discard-comments';

import config from './purgecss.config';

function clearDirectory(directory: string): void {
  if (fs.existsSync(directory)) {
    fs.readdirSync(directory).forEach((file) => {
      const curPath = path.join(directory, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        clearDirectory(curPath);
        fs.rmdirSync(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
  }
}

async function runPurgeCSS(): Promise<void> {
  try {
    clearDirectory(config.output);
    const cssFiles = globSync(config.css)
    const htmlFiles = globSync(config.content);
    console.log(htmlFiles);

    const purgeCSSResults = await Promise.all(
      cssFiles.map(async (cssFile) => {
        const cssContent = fs.readFileSync(cssFile, 'utf8');
        const result = await postcss([
          PurgeCSS({
            content: htmlFiles,
            extractors: config.extractors,
          }),
          discardComments({ removeAll: true }), // Remove all comments
        ]).process(cssContent, { from: cssFile, to: path.join(config.output, path.relative('input', cssFile)) });
        return result;
      })
    );

    purgeCSSResults.forEach((result) => {
      fs.mkdirSync(path.dirname(result.opts.to!), { recursive: true });
      fs.writeFileSync(result.opts.to!, result.css);
    });

    htmlFiles.forEach((htmlFile) => {
      const destPath = path.join(config.output, path.relative('input', htmlFile));
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(htmlFile, destPath);
    });

    console.log('CSS tree shaking completed and HTML files copied.');
  } catch (error) {
    console.error('Error during PurgeCSS processing:', error);
  }
}

runPurgeCSS(); 