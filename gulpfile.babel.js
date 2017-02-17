'use strict';
/*
 * Gulp Base Structure
 * Pablo Marchena
 * version: 1.0.0
 * https://github.com/PabloMarch
 */
 require('babel-register');

import gulp from 'gulp';
import gulpif from 'gulp-if';

import config from './gulp/config';
import styles from './gulp/tasks/styles';
import scripts from './gulp/tasks/scripts';
import images from './gulp/tasks/images';
import fonts from './gulp/tasks/fonts';
import templates from './gulp/tasks/templates';
import serve from './gulp/tasks/serve';
import mavenpom from './gulp/tasks/mavenpom';
import lint from './gulp/tasks/lint';
import utils from './gulp/tasks/utils';

const { paths, props } = config;


// ### Generate scripts
gulp.task('scripts', () => {
  scripts({ entries: `${props.basename}.js` });
  scripts({
    entries: paths.scripts.vendors,
    bundle: `${props.basename}-vendors.js`,
    basedir: paths.npmDir
  });
});


// ### Generate styles
// Options: https://github.com/sass/node-sass#options
gulp.task('styles', () => styles({
  entries: `${props.basename}.scss`,
  includePaths : [
    `${paths.npmDir}/bootstrap-sass/assets/stylesheets`,
    `${paths.npmDir}/font-awesome/scss`
  ]
}));


// ### Optimize & copy images
// Options: https://www.npmjs.com/package/gulp-imagemin#api
gulp.task('images', () => images({
  optimizationLevel: 5,
  progressive: true,
  interlaced: true
}));


// ### Copy fonts
gulp.task('fonts', () => fonts([
  // `${paths.npmDir}/bootstrap-sass/assets/fonts/bootstrap/*.{eot,svg,ttf,woff,woff2}`,
  `${paths.npmDir}/font-awesome/fonts/*.{eot,svg,ttf,woff,woff2}`
]));


// ### Generate templates
// Options: https://github.com/carlosl/gulp-nunjucks-render
gulp.task('renderhtml', () => templates({
  path: [`${paths.source}/${paths.templates.entry}/templates`],
  data: { assets_path: 'assets' }
}));


// ### Build prototype
gulp.task('build-prototype', () => {
  gulp.start('renderhtml');
})


// ### Prepare files to be deployed
gulp.task('mavepom', mavenpom);
gulp.task('run-versioning', utils.runVersioning);
gulp.task('deploy', ['mavepom', 'run-versioning'], () => utils.createZip());


// ### Build assets
gulp.task('build-assets', ['styles', 'scripts', 'images', 'fonts'], () => {
  // Run depends of environment
  const task = (props.env === 'prod' ? 'deploy' : 'build-prototype');
  gulp.start(task);
});


// ### Clean build folder
gulp.task('clean', utils.clean);

// ### Eslint
gulp.task('lint', lint);

// ### Build
gulp.task('build', ['lint', 'clean'], () => gulp.start('build-assets'));

// ### Watch
gulp.task('serve', ['build'], serve);
