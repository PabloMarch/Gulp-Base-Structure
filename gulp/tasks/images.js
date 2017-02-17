'use strict';
import config from '../config';
import cache from 'gulp-cache';
import imagemin from 'gulp-imagemin';
import notify from 'gulp-notify';
import { dest, src } from 'gulp';

const { source, builds, images } = config.paths;

// ### Compress images
export default function (params = {}) {
  return src(`${source}/${images.entry}/**/*`)
    .pipe(cache(imagemin(params)))
    .pipe(dest(`${builds}/${config.props.env}/${images.dest}`))
    .pipe(notify({ message: 'Optimizing image.' }));
}
