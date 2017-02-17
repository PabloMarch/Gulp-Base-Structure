import config from '../config';
import { src } from 'gulp';
import eslint from 'gulp-eslint';
import notify from 'gulp-notify';

const isLocal = config.props.env === 'local';
const { source, scripts } = config.paths;

export default function () {
  if(isLocal) return;
  return src([`${source}/**/*.js`, `!${source}/**/vendors/**`])
    .pipe(eslint())
    .pipe(eslint.results(results => {
  	   // Called once for all ESLint results.
      console.log(`Total Results: ${results.length}`);
      console.log(`Total Warnings: ${results.warningCount}`);
      console.log(`Total Errors: ${results.errorCount}`);
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}
