'use strict';
import config from '../config';
import flatten from 'gulp-flatten';
import notify from 'gulp-notify';
import { src, dest } from 'gulp';

export default function (fonts = []) {
  return src(fonts)
    .pipe(flatten())
    .pipe(dest(`${config.paths.builds}/${config.props.env}/${config.paths.fonts}`))
    .pipe(notify({ message: 'Fonts copied.' }));
}
