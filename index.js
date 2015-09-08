/* jshint node: true */
'use strict';

var path = require('path');

module.exports = {
  name: 'ember-falcor',
  serverMiddleware: function(options) {
    var app = options.app;
    var FalcorServer = require('falcor-express');
    var RouterFactory = require(path.join(this.project.root, 'falcor-server/router.js'));

    app.use('/model.json', FalcorServer.dataSourceRoute(function(req) {
      return new RouterFactory(req);
    }));
  }
};
