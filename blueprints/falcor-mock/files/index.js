var isPackageMissing = require('ember-cli-is-package-missing');
var stringUtil = require('ember-cli-string-utils');

module.exports = {
  description: 'Generates a Falcor server directory for mocks and proxies.',
  availableOptions: [
    {
      name: 'route',
      type: 'string'
    },
    {
      name: 'method',
      type: 'string',
      default: 'get'
    }
  ],
  locals: function(options) {
    var contents;

    var name = options.entity.name;
    var dasherizedName = stringUtil.dasherize(name);
    var camelized = stringUtil.camelize(name);
    var classified = stringUtil.classify(name);

    switch (options.entity.type) {
      case 'get':
        contents = 'get: function(pathSets) { }';
        break;
      case 'set':
        contents = 'set: function(JSONGraphEnvelope) { }';
        break;
      case 'call':
        contents = 'call: function(callPath, args, pathSuffixes, paths) { }';
        break;
    }

    return {
      route: options.entity.route,
      contents: contents,
      camelizedName: camelized,
      classifyName: classified,
      dasherizedName: dasherizedName
    };
  },

  afterInstall: function(options) {
   var jsonGraphMissing = isPackageMissing(this, 'falcor-json-graph');
   var libsToInstall = [];

   if (jsonGraphMissing) {
     libsToInstall.push({ name: 'falcor-json-graph', target: '^1.1.5' });
   }

   if (!options.dryRun && jsonGraphMissing) {
     return this.addPackagesToProject(libsToInstall);
   }

 }
};
