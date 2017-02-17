import config from '../config';
import del from 'del';
import rename from 'gulp-rename';
import notify from 'gulp-notify';
import zip from 'gulp-zip';
import { dest, src } from 'gulp';

const { builds, styles, scripts, appdest } = config.paths;
const { env, version, buildname } = config.props;


// ### Add version to the assets
function runVersioning () {
  var paths = [
    `${builds}/${env}/${styles.dest}/*.css`,
    `${builds}/${env}/${scripts.dest}/*.js`
  ];

  return src(paths, { base: `${builds}/${env}/${appdest}` })
    .pipe(rename(function (path) {
      var name = path.basename.split('.');
      path.basename = `${name[0]}.${version}.${name[1]}`;
    }))
    .pipe(dest(`${builds}/${env}/${appdest}`))
    .pipe(notify({ message: 'Versioning styleguide files.' }));
}


// ### creating zipfile
function createZip () {
  return src(`${builds}/${env}/**/*`)
		.pipe(zip(`${buildname}.zip`))
		.pipe(dest(builds))
    .on('end', clean)
    .pipe(notify({ message: 'Wake up lazy boy! Zipfile is done.' }));
}


// ### Clean
// `gulp clean` - Deletes the build folder entirely.
function clean () {
  const delFolder = env === 'clean' ? builds : `${builds}/${env}`;
  del([delFolder])
}


// Exports
export default {
  runVersioning,
  createZip,
  clean
}
