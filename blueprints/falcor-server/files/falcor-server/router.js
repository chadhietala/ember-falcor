var Router = require('falcor-router');
var globSync = require('glob').sync;
var routes = globSync('./routes/**/*.js', { cwd: __dirname }).map(require);


var EmberFalcorRouterBase = Router.createClass(routes);

var EmberFalcorRouter = function(req) {
  EmberFalcorRouterBase.call(this);
  this.request = req;
};

EmberFalcorRouter.prototype = Object.create(EmberFalcorRouterBase.prototype);

module.exports = function(req) {
  return new EmberFalcorRouter(req);
};
