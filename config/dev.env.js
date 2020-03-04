"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT: '"http://binger.natapp1.cc/public/cmsv4/"'
  API_ROOT: '"http://api.howeaver.cn/public/cmsv4/"'
});
