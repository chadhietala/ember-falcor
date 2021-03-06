/* jshint node: true */
'use strict';

var path = require('path');

module.exports = {
  name: 'ember-falcor',
  init: function() {
    this.ext = process.env.EMBER_ENV === 'development' ? '.js' : '.min.js';
    this.treePaths['vendor'] = this.nodeModulesPath + path.sep;
  },
  included: function () {
    this.app.import('vendor/falcor/dist/falcor.browser' + this.ext, {
      exports: {
        'falcor': ['default', 'Model', 'HttpDataSource', 'Promise']
      }
    });
  },
  serverMiddleware: function(options) {
    var app = options.app;
    var FalcorServer = require('falcor-express');
    var RouterFactory = require(path.join(this.project.root, 'falcor-server/router.js'));

    app.use('/model.json', FalcorServer.dataSourceRoute(function(req) {
      return new RouterFactory(req);
    }));
  }
};
