var isPackageMissing = require('ember-cli-is-package-missing');

module.exports = {
  description: 'Generates a Falcor server directory for mocks.',
  afterInstall: function(options) {
   var routerMissing = isPackageMissing(this, 'falcor-router');
   var globMissing = isPackageMissing(this, 'glob');


   var areDependenciesMissing = routerMissing || globMissing;
   var libsToInstall = [];

   if (globMissing) {
     libsToInstall.push({ name: 'glob', target: '^4.0.5' });
   }

   if (routerMissing) {
     libsToInstall.push({ name: 'falcor-router', target: '^0.2.9' });
   }

   if (!options.dryRun && areDependenciesMissing) {
     return this.addPackagesToProject(libsToInstall);
   }

 }
};
