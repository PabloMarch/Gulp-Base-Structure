'use strict';
import config from '../config';
import browsersync from 'browser-sync';
import browserify from 'browserify';
import sourceStream from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
import notify from 'gulp-notify';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import { dest, src } from 'gulp';

const { source, builds, scripts, npmDir } = config.paths;
const { env, fileSuffix, version } = config.props;

// Prepare bundle
function spitBundle (basedir, params) {
  const multipleEntries = Array.isArray(params.entries);
  // Skin browserify processing on vendor scripts and external files
  if (basedir) {
    let fullPaths;
    if (multipleEntries) {
      fullPaths = params.entries.map(path => `${basedir}/${path}`);
    } else {
      fullPaths = `${basedir}/${params.entries}`;
    }
    return src(fullPaths);
  }
  // Only process files into the app src
  const b = browserify({
    entries: params.entries,
    basedir: `${source}/${scripts.entry}`,
    debug: true
  });
  return b.bundle()
    .pipe(sourceStream(multipleEntries ? params.bundle : params.entries))
    .pipe(buffer());
}


// ### Compile Scripts
export default function (params = {}) {
  const compressFiles = env !== 'local';
  const devMode = !(env === 'prod' || params.basedir);
  return spitBundle(params.basedir, params)
    .pipe(gulpif(devMode, sourcemaps.init({ loadMaps: true })))
    .pipe(concat(params.bundle || params.entries))
    .pipe(gulpif(compressFiles, uglify({ mangle: false })))
    .pipe(gulpif(compressFiles, rename({ suffix: fileSuffix })))
    .pipe(gulpif(devMode, sourcemaps.write('./_sourcemaps')))
    .pipe(dest(`${builds}/${env}/${scripts.dest}`))
    // .pipe(browsersync.stream())
    .pipe(notify({ message: params.entries + ' done.' }));
}
