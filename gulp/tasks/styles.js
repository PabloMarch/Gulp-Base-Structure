'use strict';
import config from '../config';
import browsersync from 'browser-sync';
import notify from 'gulp-notify';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import cleancss from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import { dest, src } from 'gulp';

const { source, builds, styles } = config.paths;
const { env, fileSuffix, version } = config.props;

// ### Compile Styles
export default function (params = {}) {
  const compressFiles = env !== 'local';
  const devMode = !(env === 'prod' || params.basedir);
  return src(`${source}/${styles.entry}/**/${params.entries}`)
    .pipe(gulpif(devMode, sourcemaps.init({loadMaps: true})))
    .pipe(sass(params))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulpif(compressFiles, cleancss()))
    .pipe(gulpif(compressFiles, rename({ suffix: fileSuffix })))
    .pipe(gulpif(devMode, sourcemaps.write('./_sourcemaps')))
    .pipe(dest(`${builds}/${env}/${styles.dest}`))
    .pipe(browsersync.stream())
    .pipe(notify({ message: params.filename + ' done.' }));
}
