import config from '../config';
import notify from 'gulp-notify';
import { dest, src } from 'gulp';
import nunjucksrender from 'gulp-nunjucks-render';

const { source, builds, templates } = config.paths;

// ### Render html nunjucks templates
export default function (params = {}) {
  nunjucksrender.nunjucks.configure([`${source}/${templates.entry}/templates/`]);

  return src(`${source}/${templates.entry}/pages/**/*.+(html|nunjucks)`)
    .pipe(nunjucksrender(params))
    .pipe(dest(`${builds}/${templates.dest}`))
    .pipe(notify({ message: 'Building template.' }));;
};
