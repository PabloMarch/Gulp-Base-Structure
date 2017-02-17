'use strict';
import props from '../package.json';
const env = process.env.NODE_ENV || 'local';
const assets = 'assets';
const config = {
  props: {
    basename: 'app',
    buildname: props.name,
    version: props.version,
    fileSuffix: '.min',
    env: env
  },
  paths: {
    source: './source',
    builds: './builds',
    npmDir: './node_modules',
    appdest: assets,
    fonts: `${assets}/fonts`,
    styles: {
      entry: 'sass',
      dest: `${assets}/styles`
    },
    scripts: {
      entry: 'js',
      dest: `${assets}/scripts`,
      vendors: [
        // 'bootstrap-sass/assets/javascripts/bootstrap.js'
      ]
    },
    images: {
      entry: 'img',
      dest: `${assets}/img`
    },
    templates: {
      entry: 'html',
      dest: env
    }
  }
}

export default config;
