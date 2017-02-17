'use strict';
import config from '../config';
import gulp from 'gulp';
import { create, init, reload } from 'browser-sync';

const { source, builds, styles, scripts, images, templates } = config.paths;

export default function() {
  create();
  init({ server : `${builds}/${config.props.env}` });
  gulp.watch([`${source}/${styles.entry}/**/*.scss`], ['styles']);
  gulp.watch([`${source}/${scripts.entry}/**/*.js`], ['scripts']);
  gulp.watch([`${source}/${images.entry}/**/*`], ['images']);
  gulp.watch([`${source}/${templates.entry}/**/*.+(html|nunjucks)`], ['renderhtml']).on('change', reload);
}
