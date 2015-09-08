'use strict';

var <%= camelizedName %> = require('../services/<%= dasherizedName %>');

module.exports = {
  route: '<%= route %>',
  <%= contents %>
};
